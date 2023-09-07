import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineStar,
  AiFillStar,
  AiOutlineFieldTime,
  AiOutlineNumber,
} from "react-icons/ai";
import { PiHandsPrayingBold } from "react-icons/pi";
import { CgTranscript } from "react-icons/cg";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ReviewComponent = () => {
  const url = useSelector((state) => state.url);

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div class="w-screen h-screen flex justify-center items-center flex lato flex-col bg-zinc-900 ">
        <div class="flex w-full h-full bg-zinc-900">
          <div class="h-screen w-2/3">
            <div class="h-1/6 w-full pt-10px pr-5px pb-5px pl-10px">
              <div class="no-scrollbar h-full w-full bg-black rounded-md text-white overflow-scroll flex flex-col justify-center items-center gap-20px pr-20px pl-20px">
                <div class="text-[2rem] kanit text-center font-bold w-full">
                  Why do you want to work at Google?
                </div>
                <div class="w-full flex justify-between items-center bg-zinc-900 p-5px rounded-lg pl-20px pr-20px">
                  <div class="flex justify-center items-center gap-10px">
                    <AiOutlineFieldTime class="h-20px w-20px" />2 min 34 sec
                  </div>
                  <div class="flex justify-center items-center gap-10px">
                    <CgTranscript class="h-20px w-20px" />
                    View Transcript
                  </div>
                  <div class="flex justify-center items-center gap-10px">
                    <AiOutlineNumber class="h-20px w-20px" />
                    Attempt 4
                  </div>
                  <div class="flex justify-center items-center gap-10px">
                    <PiHandsPrayingBold class="h-20px w-20px" />
                    Unmastered
                  </div>
                </div>
              </div>
            </div>
            <div class="h-5/6 pt-5px pr-5px pb-10px pl-10px">
              <div class="h-full bg-black rounded-md flex justify-center align-center p-10px w-content">
                <video
                  controls
                  src={url}
                  class="border-black border-2 border-solid"
                />
              </div>
            </div>
          </div>
          <div class="h-screen w-1/3">
            <div
              class="w-full pt-10px pr-10px pb-5px pl-5px"
              style={{ height: "calc(100vh * 1/10)" }}
            >
              <div class="h-full w-full bg-black rounded-md flex justify-between items-center text-white p-20px">
                <div class="flex gap-10px">
                  <AiFillStar class="w-25px h-25px" />
                  <AiFillStar class="w-25px h-25px" />
                  <AiFillStar class="w-25px h-25px" />
                  <AiOutlineStar class="w-25px h-25px" />
                  <AiOutlineStar class="w-25px h-25px" />
                </div>
                <div class="flex justify-center items-center gap-10px border-solid border-white border-b pb-5px cursor-pointer select-none">
                  Return Home <BsArrowRightSquareFill />
                </div>
              </div>
            </div>
            <div
              class="w-full pt-5px pr-10px pb-5px pl-5px"
              style={{ height: "calc(100vh * 9/20)" }}
            >
              <div class="h-full w-full bg-black rounded-md p-15px">
                <div class="font-bold w-full h-content text-[1.5rem] border-solid border-b border-white mb-20px text-white pb-5px">
                  Strengths
                </div>
                <div
                  class="no-scrollbar w-full flex flex-col gap-15px kanit overflow-scroll text-[1.2rem]"
                  style={{
                    height: "calc(100% - 60px)",
                  }}
                >
                  <Skeleton count={8} />
                  {/* <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillPlusCircle
                    class="w-25px h-25px mt-5px"
                    color="green"
                  />
                  <div class="w-full h-content text-white">
                    The response draws on specific initiatives and attributes of
                    JPMorgan Chase, showing that the candidate has done their
                    homework. This demonstrates genuine interest and dedication.
                  </div>
                </div>
                <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillPlusCircle
                    class="w-25px h-25px mt-5px"
                    color="green"
                  />
                  <div class="w-full h-content text-white">
                    By highlighting diversity, innovation, and professional
                    growth, the answer aligns the candidate's personal values
                    with those of the company, building common ground.
                  </div>
                </div>
                <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillPlusCircle
                    class="w-25px h-25px mt-5px"
                    color="green"
                  />
                  <div class="w-full h-content text-white">
                    The response successfully intertwines personal aspirations
                    with professional goals, portraying a holistic view of the
                    candidate's motivations.
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div
              class="w-full pt-5px pr-10px pb-10px pl-5px"
              style={{ height: "calc(100vh * 9/20)" }}
            >
              <div class="h-full w-full bg-black rounded-md p-15px">
                <div class="font-bold w-full h-content text-[1.5rem] border-solid border-b border-white mb-20px text-white pb-5px">
                  Areas of Improvement
                </div>
                <div
                  class="no-scrollbar w-full flex flex-col gap-15px kanit overflow-scroll text-[1.2rem]"
                  style={{
                    height: "calc(100% - 60px)",
                  }}
                >
                  <Skeleton count={8} />
                  {/* <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillMinusCircle class="w-25px h-25px mt-5px" color="red" />
                  <div class="w-full h-content text-white">
                    The answer, while thorough, can be perceived as lengthy. A
                    more concise response might be more impactful, especially in
                    a time-constrained interview setting.
                  </div>
                </div>
                <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillMinusCircle class="w-25px h-25px mt-5px" color="red" />
                  <div class="w-full h-content text-white">
                    While the answer touches on the broad tech initiatives, it
                    doesn't delve into how the specific software engineer role
                    fits into these initiatives or the candidate's expertise in
                    relevant technologies.
                  </div>
                </div>
                <div class="w-full h-content flex justify-center items-start gap-10px">
                  <AiFillMinusCircle class="w-25px h-25px mt-5px" color="red" />
                  <div class="w-full h-content text-white">
                    Incorporating past quantifiable achievements or experiences
                    that align with the candidate's motivations to work for
                    JPMorgan Chase could add more credibility to the response.
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ReviewComponent;
