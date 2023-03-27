import { useState } from "react";

function MoreOptions() {
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  return (
    <div className="more-options-">
      <button
        className={`repeat ${repeat ? "active-opt" : ""}`}
        onClick={() => setRepeat(!repeat)}
      >
        <svg
          width={20}
          height={18}
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.9808 6.15384L19.7113 3.98608L15.4808 0.981799L14.9808 6.15384ZM2.05723 9.86185C2.17029 8.69214 2.64257 7.19871 4.29264 6.143C5.99028 5.05686 9.11864 4.31124 14.8383 5.15251L15.1358 3.17441C9.20778 2.3025 5.50512 2.99669 3.2178 4.46011C0.882914 5.95396 0.216288 8.11983 0.0658912 9.67591L2.05723 9.86185Z"
            fill="#F3F4F6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.77091 12.6226L0.147909 15.0036L4.51474 17.8124L4.77091 12.6226ZM17.7061 8.20466C17.6482 9.377 17.2469 10.889 15.648 12.0179C14.0028 13.1795 10.9119 14.0661 5.15735 13.4862L4.95335 15.476C10.9171 16.0769 14.5836 15.2156 16.7999 13.6508C19.0625 12.0533 19.6268 9.86048 19.7038 8.29972L17.7061 8.20466Z"
            fill="#F3F4F6"
          />
        </svg>
      </button>
      <button
        className={`shuffle ${shuffle ? "active-opt" : ""}`}
        onClick={() => setShuffle(!shuffle)}
      >
        <svg
          width={20}
          height={14}
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7451 9.92656C11.3866 10.6757 12.1051 11.3884 12.9475 11.9925C14.6981 13.2479 16.9202 13.9961 19.9892 13.8394L19.8872 11.842C17.2351 11.9775 15.4676 11.3386 14.113 10.3672C13.2952 9.78077 12.606 9.05963 11.9539 8.25164C11.9071 8.31703 11.86 8.38311 11.8125 8.44988L11.6622 8.66123C11.3777 9.06164 11.0739 9.48927 10.7451 9.92656ZM8.82627 4.06225C8.21105 3.32314 7.52879 2.619 6.73621 2.02165C5.06165 0.759585 2.94499 0.00265121 0.0113525 0.160742L0.118974 2.15784C2.60525 2.02386 4.25242 2.65411 5.53246 3.61884C6.31073 4.2054 6.97061 4.92582 7.60704 5.73567C7.65068 5.67445 7.69473 5.61259 7.73922 5.55009L7.75789 5.52386L7.7579 5.52385C8.08513 5.06419 8.43797 4.56855 8.82627 4.06225Z"
            fill="#F3F4F6"
          />
          <path
            d="M0.0651855 12.8407C10.905 13.4249 8.49615 0.575017 19.9382 1.1593"
            stroke="#F3F4F6"
            strokeWidth={2}
          />
        </svg>
      </button>
      <button className="add-to-album">
        <svg
          width={25}
          height={22}
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0.5C7.60218 0.5 7.22064 0.658035 6.93934 0.93934C6.65804 1.22064 6.5 1.60218 6.5 2C6.5 2.39782 6.65804 2.77936 6.93934 3.06066C7.22064 3.34196 7.60218 3.5 8 3.5H17C17.3978 3.5 17.7794 3.34196 18.0607 3.06066C18.342 2.77936 18.5 2.39782 18.5 2C18.5 1.60218 18.342 1.22064 18.0607 0.93934C17.7794 0.658035 17.3978 0.5 17 0.5H8ZM3.5 6.5C3.5 6.10218 3.65804 5.72064 3.93934 5.43934C4.22064 5.15804 4.60218 5 5 5H20C20.3978 5 20.7794 5.15804 21.0607 5.43934C21.342 5.72064 21.5 6.10218 21.5 6.5C21.5 6.89782 21.342 7.27936 21.0607 7.56066C20.7794 7.84196 20.3978 8 20 8H5C4.60218 8 4.22064 7.84196 3.93934 7.56066C3.65804 7.27936 3.5 6.89782 3.5 6.5ZM0.5 12.5C0.5 11.7044 0.81607 10.9413 1.37868 10.3787C1.94129 9.81607 2.70435 9.5 3.5 9.5H21.5C22.2956 9.5 23.0587 9.81607 23.6213 10.3787C24.1839 10.9413 24.5 11.7044 24.5 12.5V18.5C24.5 19.2956 24.1839 20.0587 23.6213 20.6213C23.0587 21.1839 22.2956 21.5 21.5 21.5H3.5C2.70435 21.5 1.94129 21.1839 1.37868 20.6213C0.81607 20.0587 0.5 19.2956 0.5 18.5V12.5Z"
            fill="#4d5466"
          />
        </svg>
      </button>
    </div>
  );
}

export default MoreOptions;
