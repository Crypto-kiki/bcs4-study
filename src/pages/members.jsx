import Data from "../data.json";
import { AiFillGithub } from "react-icons/ai";
import { SiVelog } from "react-icons/si";
import { BiSolidRightArrowSquare } from "react-icons/bi";
import { Link } from "react-router-dom";
import GitHubCalendar from "react-github-calendar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Members = () => {
  // d-day
  const targetDate = new Date("2024-02-29");
  const currentDate = new Date();
  const timeRemaining = currentDate - targetDate;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  // github grass
  const selectLastHalfYear = (contributions) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const shownMonths = 6;

    return contributions.filter((activity) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };

  // velog rss
  const [rssTitles, setRssTitles] = useState({});
  const [rssPubDate, setRssPubDate] = useState({});
  const [rssLink, setRssLink] = useState({});

  useEffect(() => {
    // 멤버별 RSS 피드 가져오기
    Data.forEach((member) => {
      const RSS_FEED_URL = `/rss/${member.velog}`;
      axios
        .get(RSS_FEED_URL)
        .then((response) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "text/xml");
          const itemElements = xmlDoc.querySelectorAll("item");

          if (itemElements.length >= 1) {
            const memberRssTitle =
              itemElements[0].querySelector("title").textContent;
            setRssTitles((prevRssTitles) => ({
              ...prevRssTitles,
              [member.velog]: memberRssTitle,
            }));

            const memberRssPubDate =
              itemElements[0].querySelector("pubDate").textContent;
            setRssPubDate((prevRssPubDate) => ({
              ...prevRssPubDate,
              [member.velog]: memberRssPubDate,
            }));

            const memberRssLink =
              itemElements[0].querySelector("link").textContent;
            setRssLink((prevRssLink) => ({
              ...prevRssLink,
              [member.velog]: memberRssLink,
            }));
          }
          console.log(itemElements);
        })
        .catch((error) => {
          console.error(
            `RSS 피드 가져오기 중 오류 발생 (${member.velog}):`,
            error
          );
        });
    });
  }, []);
  console.log(RSS_FEED_URL);
  console.log(rssTitles);

  return (
    <div className="px-24 bg-black text-gray-300 py-10">
      <header className="py-6 font-bold text-white">
        <div className="flex justify-between items-center">
          <div className="text-4xl">블록체인 스쿨 4기</div>
          <div className="text-lg">수료까지 D {daysRemaining}</div>
        </div>
        <div className="mt-10">
          <p>다른 수강생 분들은 어떻게 공부하고 있을까요?🧑‍💻</p>
          <p className="mt-4">내가 공부한 것을 공유하고 함께 성장해요!😀</p>
        </div>
      </header>
      <main className="py-10">
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {Data.filter((v) => v.velog !== "").map((v, i) => (
            <div key={i} className="border-b-2 pb-4">
              <div className="flex items-center">
                <div className="font-semibold text-xl text-white">{v.name}</div>
                <div className="flex items-center">
                  <Link to={`https://github.com/${v.git}`} target="_blank">
                    <AiFillGithub className="w-5 h-5 mx-4" />
                  </Link>
                  <Link to={`https://velog.io/@${v.velog}`} target="_blank">
                    <SiVelog className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                <div>
                  <GitHubCalendar
                    username={v.git}
                    transformData={selectLastHalfYear}
                    hideColorLegend
                    labels={{
                      totalCount:
                        "{{count}} contributions in the last half year",
                    }}
                    // showWeekdayLabels
                    colorScheme="dark"
                  />
                </div>
                <div>
                  {rssTitles[v.velog] ? (
                    <Link to={rssLink[v.velog]} target="_blank">
                      <div>
                        <div className="text-lg font-semibold flex items-center text-white">
                          Latest Velog post{" "}
                          <BiSolidRightArrowSquare className="ml-2" />
                        </div>
                        <div className="my-2 text-lg">{rssTitles[v.velog]}</div>
                        <div className="text-xs">{rssPubDate[v.velog]}</div>
                      </div>
                    </Link>
                  ) : (
                    <div className="text-sm">TIL 작성해주세요😥</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Members;
