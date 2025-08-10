import React from 'react';

// The custom CSS is embedded directly in the component to keep it self-contained.
// CSS variables are used for easy customization.
const customStyles = `
/* CSS variables for easy color customization */
:root {
  --truck-body-color: #F83D3D;
  --truck-window-color: #7D7C7C;
  --truck-details-color: #282828;
  --truck-light-color: #FFFCAB;
  --tire-color: #282828;
  --road-color: #282828;
  --road-line-color: #FFFFFF;
  --background-color: #F9FAFB;
}

/* Global container for the loader */
.loader-container-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;
}

/* Main loader wrapper */
.loader-container {
  width: 250px; /* Slightly larger for better detail */
  height: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

/* Wrapper for the truck's suspension effect */
.truckWrapper {
  position: absolute;
  bottom: 30px;
  animation: motion 1s linear infinite;
  z-index: 10;
}

/* Truck body styling */
.truckBody {
  width: 170px; /* Adjusted size */
  height: auto;
  margin-bottom: 8px;
}

/* Keyframe animation for the truck's subtle up-and-down motion */
@keyframes motion {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
}

/* Styling for the truck's tires */
.truckTires {
  width: 170px;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  position: absolute;
  bottom: 0;
  z-index: 10;
}
.truckTires svg {
  width: 30px; /* Adjusted size */
}

/* Road with animated lines */
.road {
  width: 200vw; /* Make road wider to prevent gaps */
  height: 4px;
  background-color: var(--road-color);
  position: absolute;
  bottom: 20px;
  z-index: 5;
}

/* Animated road lines using pseudo-elements */
.road::before, .road::after {
  content: "";
  position: absolute;
  height: 100%;
  background-color: var(--road-color);
  border-left: 8px dashed var(--road-line-color);
  animation: roadAnimation 2s linear infinite;
}

.road::before {
  width: 150px;
  left: 0;
  border-left-width: 5px;
  animation-delay: 0s;
}

.road::after {
  width: 150px;
  left: 200px; /* Offset the second line */
  border-left-width: 5px;
  animation-delay: 1s;
}

/* The lamp post element */
.lampPost {
  position: absolute;
  bottom: 20px;
  right: -50%;
  height: 120px; /* Adjusted size */
  animation: roadAnimation 2s linear infinite;
  z-index: 5;
}

/* Keyframe animation for the moving road and lamp post */
@keyframes roadAnimation {
  0% { transform: translateX(0); }
  100% { transform: translateX(-400px); } /* Slower, smoother animation */
}

/* Loading text with a typing effect */
.loading-text {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--truck-details-color);
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  border-right: .15em solid orange;
  animation: typing 2s steps(15, end) infinite, blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: orange; }
}

`;

const DeliveryTruckLoader = () => {
  return (
    <div className="loader-container-wrapper">
      {/* Inject the custom styles */}
      <style>{customStyles}</style>
      <div className="loader-container">
        <div className="truckWrapper">
          <div className="truckBody">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 198 93"
              className="trucksvg"
            >
              {/* Main truck container */}
              <path
                strokeWidth="3"
                stroke="var(--truck-details-color)"
                fill="var(--truck-body-color)"
                d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
              ></path>
              {/* Truck window */}
              <path
                strokeWidth="3"
                stroke="var(--truck-details-color)"
                fill="var(--truck-window-color)"
                d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
              ></path>
              {/* Small details */}
              <path
                strokeWidth="2"
                stroke="var(--truck-details-color)"
                fill="var(--truck-details-color)"
                d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
              ></path>
              {/* Headlight */}
              <rect
                strokeWidth="2"
                stroke="var(--truck-details-color)"
                fill="var(--truck-light-color)"
                rx="1"
                height="7"
                width="5"
                y="63"
                x="187"
              ></rect>
              <rect
                strokeWidth="2"
                stroke="var(--truck-details-color)"
                fill="var(--truck-details-color)"
                rx="1"
                height="11"
                width="4"
                y="81"
                x="193"
              ></rect>
              {/* Truck storage box */}
              <rect
                strokeWidth="3"
                stroke="var(--truck-details-color)"
                fill="#DFDFDF"
                rx="2.5"
                height="90"
                width="121"
                y="1.5"
                x="6.5"
              ></rect>
              {/* Small detail on storage box */}
              <rect
                strokeWidth="2"
                stroke="var(--truck-details-color)"
                fill="#DFDFDF"
                rx="2"
                height="4"
                width="6"
                y="84"
                x="1"
              ></rect>
            </svg>
          </div>
          <div className="truckTires">
            {/* Front tire */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tiresvg"
            >
              <circle
                strokeWidth="3"
                stroke="var(--tire-color)"
                fill="var(--tire-color)"
                r="13.5"
                cy="15"
                cx="15"
              ></circle>
              <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
            </svg>
            {/* Rear tire */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 30"
              className="tiresvg"
            >
              <circle
                strokeWidth="3"
                stroke="var(--tire-color)"
                fill="var(--tire-color)"
                r="13.5"
                cy="15"
                cx="15"
              ></circle>
              <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
            </svg>
          </div>
        </div>
        <div className="road"></div>
        <svg
          xmlSpace="preserve"
          viewBox="0 0 453.459 453.459"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          id="Capa_1"
          version="1.1"
          fill="var(--truck-details-color)"
          className="lampPost"
        >
          <path
            d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0zM232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default DeliveryTruckLoader;
