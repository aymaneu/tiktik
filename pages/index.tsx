import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";
interface IProps {
  videos: Video[];
}

export default function Home({ videos }: IProps) {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((v: Video) => <VideoCard post={v} key={v._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data,
    },
  };
};
