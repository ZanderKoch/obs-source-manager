import { FunctionComponent, useContext, useEffect, useState } from "react";
import { OBSSource } from "../shared";
import { OBSConnectionContext } from "../contexts/OBSConnectionContext";
import { toast } from "react-toastify";
import { Video, VideoOff } from "react-feather";
import Switch from "react-switch";

interface SourceProps {
  source: OBSSource;
  setEnabled: (source: OBSSource, value: boolean) => void;
}

const Source: FunctionComponent<SourceProps> = ({ source, setEnabled }) => {
  const { connection, isRecording } = useContext(OBSConnectionContext);

  const [imageData, setImageData] = useState<string>();

  useEffect(() => {
    const getPreviewImage = async () => {
      try {
        if (!connection) {
          throw new Error("could not connect to webSocket");
        }

        if (!source.enabled) {
          /*OBS won't render screenshots for a disabled source and throws an
            an error*/
          return;
        }

        const response = await connection.call("GetSourceScreenshot", {
          sourceName: source.sourceName,
          imageFormat: "jpg",
          imageWidth: 512,
          imageCompressionQuality: 100,
        });

        setImageData(response.imageData);
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unexpected error occured");
        }
      }
    };

    getPreviewImage();
  }, [source, connection]);

  function toggleSourceEnabled() {
    //console.log(`toggling ${source.sourceName}`);
    setEnabled(source, !source.enabled);
  }

  return (
    <li>
      <div className="flex flex-col border-2 space-y-2 pb-2">
        <span className="border-b-2 font-semibold px-2">
          {source.sourceName}
        </span>
        {imageData ? (
          <img
            className={`mx-2 max-h-96${!source.enabled ? " grayscale" : ""}`}
            src={`${imageData}`}
            alt={`preview of the video source ${source.sourceName}`}
          />
        ) : null}
        <div className="flex flex-row justify-between items-center mx-2 my-2">
          {source.enabled ? <Video /> : <VideoOff />}
          <Switch
            checked={source.enabled as boolean}
            onChange={() => toggleSourceEnabled()}
            aria-label={`Include source ${source.sourceName} in recording`}
            disabled={isRecording}
          ></Switch>
        </div>
      </div>
    </li>
  );
};

export default Source;
