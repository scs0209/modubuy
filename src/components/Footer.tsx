import React from "react";
import Image from "next/image";
import Link from "next/link";

import { footerIcons, footerLinks, ftPaymentsImgs } from "@/constants";

const Footer = () => {
  return (
    <footer className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
      {/* TOP */}
      <section className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <article className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">ModuBuy</div>
          </Link>
          <p>서울특별시 강남구 테헤란로 123 4층</p>
          <span className="font-semibold">tjdckdtn2463@naver.com</span>
          <span className="font-semibold">+82 010 8665 5745</span>
          <div className="flex gap-6">
            {footerIcons.map((icon) => (
              <Image
                src={icon.src}
                alt={icon.alt}
                width={16}
                height={16}
                key={icon.src}
              />
            ))}
          </div>
        </article>
        {/* CENTER */}
        <nav className="hidden lg:flex w-1/2 justify-between">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col justify-between">
              <h1 className="font-medium text-lg">{section.title}</h1>
              <ul className="flex flex-col gap-6">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href="">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* RIGHT */}
        <article className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, and much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-counter text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            {ftPaymentsImgs.map((img) => (
              <Image
                src={img.src}
                alt={img.alt}
                width={40}
                height={20}
                key={img.src}
              />
            ))}
          </div>
        </article>
      </section>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div>© 2024 SCS's Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">South Korea | Korean</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
