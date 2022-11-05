/* global XR8 */
/* global THREE */

export const initScenePipelineModule = () => {
  return {
    name: "threejsinitscene",

    onStart: ({ canvas, canvasWidth, canvasHeight }) => {
      const { scene, camera } = XR8.Threejs.xrScene();

      XR8.XrController.updateCameraProjectionMatrix({
        origin: camera.position,
        facing: camera.quaternion,
      });
    },
  };
};
