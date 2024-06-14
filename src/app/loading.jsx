import { Player, Controls } from "@lottiefiles/react-lottie-player";
export default function Loading() {
  return (
    <div className="loading-container">
      <Player
        autoplay
        loop
        src="dotloading.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
}
