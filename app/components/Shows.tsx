/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {BsTwitter} from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md';
import {HiLink} from 'react-icons/hi'
import {PiBuildingsFill} from 'react-icons/pi'
import Repos from './Repos';

interface iopt {
  year: string

}

const Shows = ({userData, setloading}: any) => {
    const {
        avatar_url,
        name,
        login,
        created_at,
        bio,
        public_repos,
        followers,
        following,
        location,
        blog,
        twitter_username,
        company,
        reposUrl
      } = userData;

     
    const date = new Date(created_at);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const day = date.toLocaleDateString("en-GB", options);
  const biography = bio ? bio : "This profile has no bio";
  const websiteLink =
    !!blog && !blog.startsWith("http://") && !blog.startsWith("https://")
      ? "http://" + blog
      : blog;

       setloading && (
        <h1>Loading</h1>
      )
  return (
    <div>
    
        <div className="mt-4 rounded-[0.938rem] bg-surface px-6 pb-12 pt-8 shadow-normal dark:shadow-none md:mt-6 md:p-10 lg:p-12">
      <img
        className="inline-block h-[70px] w-auto rounded-full md:h-[117px]"
        src={avatar_url}
      />
      <div className="ml-5 inline-block align-middle md:ml-10 lg:ml-9 lg:mt-0 lg:inline-grid lg:w-[30rem] lg:grid-cols-2 lg:align-top">
        <h1 className="text-h3 font-bold text-primary md:text-h1">{name}</h1>
        <a
          className="order-1 inline-block text-h4/[1.188rem] text-link md:mt-0.5 md:text-h3"
          href={"https://github.com/" + login}
          target="_blank"
        >
          {"@" + login}
        </a>
        <p className="block text-h4/[1.188rem] text-tertiary md:mt-1 md:text-normal lg:text-right">
          {"Joined " + day}
        </p>
        <p className="mt-8 hidden text-h4/[1.563rem] text-secondary md:h-[3.125rem] md:text-normal lg:order-1 lg:col-span-2 lg:block">
          {biography}
        </p>
      </div>
      <p
        className={`mt-8 text-h4/[1.563rem] text-secondary md:h-[3.125rem] md:text-normal lg:hidden ${
          !bio && "opacity-75"
        }`}
      >
        {biography}
      </p>
      <div className="mt-6 grid grid-cols-3 rounded-[0.625rem] bg-secondary px-4 py-[1.125rem] text-center md:mt-8 md:px-8 md:py-4 md:text-left lg:ml-[9.25rem]">
        <div>
          <h4 className="text-[0.688rem]/[1rem] text-secondary md:text-h4">
            Repos
          </h4>
          <h2 className="mt-2 text-h3  font-bold text-primary md:mt-0 md:text-h2">
            {public_repos}
          </h2>
        </div>
        <div>
          <h4 className="text-[0.688rem]/[1rem] text-secondary md:text-h4">
            Followers
          </h4>
          <h2 className="mt-2 text-h3  font-bold text-primary md:mt-0 md:text-h2">
            {followers}
          </h2>
        </div>
        <div>
          <h4 className="text-[0.688rem]/[1rem] text-tertiary md:text-h4">
            Following
          </h4>
          <h2 className="mt-2 text-h3 font-bold text-primary md:mt-0 md:text-h2">
            {following}
          </h2>
        </div>
      </div>
      <div className="ml-2 mt-6 grid grid-cols-1 gap-4 text-h4/[1.188rem] text-secondary md:mt-7 md:grid-cols-2 md:text-normal lg:ml-[9.625rem] lg:mt-9">
        <div
          className={`flex items-center md:order-1 ${
            !location && "opacity-50"
          }`}
        >
          <MdLocationOn className="min-w-max fill-current" />
          <p className="ml-3">{location ? location : "Not Available"}</p>
        </div>
        <div
          className={`flex items-center md:order-3 ${
            !blog && "pointer-events-none opacity-50"
          }`}
        >
          <HiLink className="min-w-max fill-current" />
          <a
            className="ml-3"
            href={websiteLink ? websiteLink : "#"}
            target="_blank"
          >
            {websiteLink ? websiteLink : "Not Available"}
          </a>
        </div>
        <div
          className={`flex items-center md:order-2 ${
            !twitter_username && "pointer-events-none opacity-50"
          }`}
        >
          <BsTwitter className="min-w-max fill-current" />
          <a
            className="ml-3"
            href={
              twitter_username ? "https://twitter.com/" + twitter_username : "#"
            }
            target="_blank"
          >
            {twitter_username ? twitter_username : "Not Available"}
          </a>
        </div>
        <div
          className={`flex items-center md:order-4 ${
            !company && "pointer-events-none opacity-50"
          }`}
        >
          <PiBuildingsFill className="min-w-max fill-current" />
          <a
            className="ml-3"
            href={
              !!company ? "https://github.com/" + company.substring(1) : company
            }
          >
            {company ? company.substring(1) : "Not Available"}
          </a>
        </div>
      </div>
    </div>

    <Repos reposUrl={reposUrl} />
    </div>
  )
}

export default Shows