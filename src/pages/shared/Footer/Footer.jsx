import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { NavLink } from "react-router";
import MentoriumLogo from "../MentoriumLogo/MentoriumLogo";

const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/teach"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Teach on Mentorium
        </NavLink>
      </li>
    </>
  );

  return (
    <footer className="bg-neutral text-text-secondary py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <MentoriumLogo></MentoriumLogo>
          <p className="text-sm text-text mt-3">
            Empowering your learning journey with expert instructors and
            flexible courses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-text">Quick Links</h3>
          <ul className="space-y-2">{links}</ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-text">Contact Us</h3>
          <p className="text-sm mb-2">
            Email:{" "}
            <a
              href="mailto:support@mentorium.com"
              className="hover:text-primary transition"
            >
              support@mentorium.com
            </a>
          </p>
          <p className="text-sm mb-2">
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:text-primary transition">
              +1 234 567 890
            </a>
          </p>
          <p className="text-sm">Address: 123 Mentorium St, Learning City</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-text">Follow Us</h3>
          <div className="flex space-x-4 text-primary">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-accent transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-accent transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-accent transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-text-secondary text-sm mt-10">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-primary font-medium">Mentorium</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
