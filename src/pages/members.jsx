import Data from "../data.json";
import { AiFillGithub } from "react-icons/ai";
import { SiVelog } from "react-icons/si";
import { Link } from "react-router-dom";
import GitHubCalendar from "react-github-calendar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Members = () => {
  // d-day
  const targetDate = new Date("2023-10-18");
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
  const [rssTitle, setRssTitle] = useState("");

  const RSS_FEED_URL = "https://v2.velog.io/rss/kmin-283";

  useEffect(() => {
    // RSS 피드 가져오기
    axios
      .get(RSS_FEED_URL)
      .then((response) => {
        // XML 데이터를 JSON으로 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        // XML에서 제목 추출
        const title = xmlDoc.querySelector("title").textContent;

        // 제목 상태 업데이트
        // setRssTitle(title);
        console.log(title);
      })
      .catch((error) => {
        console.error("RSS 피드 가져오기 중 오류 발생:", error);
      });
  }, []);

  return (
    <div className="h-screen px-24">
      <header className="flex justify-between py-6 font-bold">
        <div className="text-2xl">Blockchain School 4th</div>
        <div className="text-lg">D + {daysRemaining}</div>
      </header>
      <main className="my-10">
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {Data.map((v, i) => (
            <div key={i}>
              <div className="flex items-center">
                <div className="font-semibold text-xl">{v.name}</div>
                <div className="flex items-center">
                  <Link to={`https://github.com/${v.git}`} target="_blank">
                    <AiFillGithub className="w-5 h-5 mx-4" />
                  </Link>
                  <Link to={`https://velog.io/@${v.velog}`} target="_blank">
                    <SiVelog className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div>
                <GitHubCalendar
                  username={v.git}
                  transformData={selectLastHalfYear}
                  hideColorLegend
                  labels={{
                    totalCount: "{{count}} contributions in the last half year",
                  }}
                  // showWeekdayLabels
                  colorScheme="light"
                />
              </div>
              {/* <div>til: {v.velog}</div> */}
            </div>
          ))}
        </div>
        {/* <h1>RSS 피드 제목: {rssTitle}</h1> */}
      </main>
    </div>
  );
};

export default Members;
