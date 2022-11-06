/* global XR8 */
/* global THREE */

import { setSegmentTexture } from "./customThreejsPipelineModule.js";
// import { LandmarkGrid } from "@mediapipe/control_utils_3d/control_utils_3d";
// import { controls } from "@mediapipe/control_utils/control_utils";
// import { drawingUtils } from "@mediapipe/drawing_utils/drawing_utils";
// import { Pose } from "@mediapipe/pose/pose";

let pose, videoElement, landmarkContainer, grid;
let processing = false;

export const blazePoseDetectionPipelineModule = () => {
  async function calcPose () {
    if (pose == null) {
      return;
    }
    await pose.send({ image: videoElement }).then(() => {
    }).catch(error => console.log(error));
  }

  return {
    name: "blazePoseDetection",

    onStart: async ({ canvas, canvasWidth, canvasHeight }) => {
      videoElement = document.getElementsByTagName("video")[0];
      landmarkContainer = document.getElementsByClassName("landmark-grid-container")[0];
      grid = new LandmarkGrid(landmarkContainer);

      function onResults (results) {
        processing = false;
        // setSegmentTexture(results.segmentationMask);
        if (!results.poseLandmarks) {
          return;
        }

        if (results.poseWorldLandmarks) {
          grid.updateLandmarks(results.poseWorldLandmarks, window.POSE_CONNECTIONS);
        } else {
          grid.updateLandmarks([]);
        }
      }

      pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);
    },

    onUpdate: () => {
      if (!processing) {
        processing = true;
        calcPose();
      }
    },
  };
};
