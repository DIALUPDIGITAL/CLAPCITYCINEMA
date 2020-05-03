import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <img className="logo" src="/CCCLogo.png" alt="Clap City Cinema Logo" />
      </Link>
      <style jsx>
        {`
          .header {
            display: flex;
            padding: 10px;
            height: 80px;
            align-items: center;
          }

          .logo {
            position: relative;
            height: 100%;
            margin-left: 2em;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}