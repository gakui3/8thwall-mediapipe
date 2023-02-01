/* global XR8 */
/* global THREE */

let hands, videoElement, landmarkContainer, grid;
let processing = false;

export const blazeHandsDetectionPipelineModule = () => {
  async function calcHands() {
    if (hands == null) {
      return;
    }
    await hands
      .send({image: videoElement})
      .then(() => {})
      .catch((error) => console.log(error));
  }

  return {
    name: "blazeHandsDetection",

    onStart: async ({canvas, canvasWidth, canvasHeight}) => {
      videoElement = document.getElementsByTagName("video")[0];

      function onResults(results) {
        processing = false;
        if (!results.multiHandLandmarks) {
          return;
        }

        if (results.multiHandLandmarks) {
          const hand = results.multiHandLandmarks[0];
          console.log(hand); //片手だけログに表示
        }
      }

      hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);
    },

    onUpdate: () => {
      if (!processing) {
        processing = true;
        calcHands();
      }
    },
  };
};
