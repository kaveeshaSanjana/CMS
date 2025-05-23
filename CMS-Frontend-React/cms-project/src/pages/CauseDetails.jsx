import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Play,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Bookmark,
  Award,
  Eye,
  EyeOff,
  MoreHorizontal
} from "lucide-react";
import { getCause } from "../services/CauseService";

// Mock data for tutorials
const mockTutorials = [
  {
    videoId: 101,
    causeId: 1,
    url: "https://youtu.be/OS7mJcv9EEU?si=ZE6CKN_Sq2fQIABJ",
    title: "Introduction to Clean Water Initiative",
    description: "Learn about our mission and how we plan to bring clean water to communities in need.",
    position: 1,
    isEnable: true,
    causeVisibility: "PUBLIC",
    duration: "4:32",
    completed: true
  },
  {
    videoId: 102,
    causeId: 1,
    url: "https://youtu.be/MW39zdHNUVk?si=uXxHiDMAZvd-VGfF",
    title: "Our Project Methodology",
    description: "A detailed explanation of how we implement water purification systems in remote areas.",
    position: 2,
    isEnable: true,
    causeVisibility: "PUBLIC",
    duration: "8:15",
    completed: true
  },
  {
    videoId: 103,
    causeId: 1,
    url: "https://example.com/video3",
    title: "Success Stories",
    description: "See the impact of our work in communities around the world.",
    position: 3,
    isEnable: true,
    causeVisibility: "PREMIUM",
    duration: "12:47",
    completed: false
  },
  {
    videoId: 104,
    causeId: 1,
    url: "https://example.com/video4",
    title: "How Your Donations Help",
    description: "A breakdown of how donations are used to support our clean water projects.",
    position: 4,
    isEnable: true,
    causeVisibility: "PREMIUM",
    duration: "6:20",
    completed: false
  },
  {
    videoId: 105,
    causeId: 1,
    url: "https://example.com/video5",
    title: "Future Goals and Expansion",
    description: "Learn about our plans for expanding clean water access in new regions.",
    position: 5,
    isEnable: true,
    causeVisibility: "PREMIUM",
    duration: "9:55",
    completed: false
  },
  {
    videoId: 1051 ,
    causeId: 1,
    url: "https://example.com/video5",
    title: "Future Goals and Expansion",
    description: "Learn about our plans for expanding clean water access in new regions.",
    position: 5,
    isEnable: true,
    causeVisibility: "PREMIUM",
    duration: "9:55",
    completed: false
  }
];

export default function CauseVideoTutorials() {
  const [tutorials, setTutorials] = useState(mockTutorials);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [causeInfo, setCauseInfo] = useState({
    title: "",
    description: "",
    completedVideos: 0,
    totalVideos: 0
  });

  const { id } = useParams();

  const getCauseDetails = async () => {
    const cause = await (await getCause(id)).data
    console.log(cause);
    setCauseInfo({...cause, completedVideos: tutorials.filter(t => t.completed).length, totalVideos: tutorials.length});
  }

  useEffect(()=>{
    getCauseDetails();
    
  },[])

  useEffect(() => {
    if (tutorials.length > 0 && !selectedVideo) {
      setSelectedVideo(tutorials[0]);
    }
  }, [selectedVideo]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleNextVideo = () => {
    const currentIndex = tutorials.findIndex(video => video.videoId === selectedVideo?.videoId);
    if (currentIndex < tutorials.length - 1) {
      setSelectedVideo(tutorials[currentIndex + 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handlePrevVideo = () => {
    const currentIndex = tutorials.findIndex(video => video.videoId === selectedVideo?.videoId);
    if (currentIndex > 0) {
      setSelectedVideo(tutorials[currentIndex - 1]);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const markAsCompleted = (videoId) => {
    setTutorials(prev =>
      prev.map(tutorial =>
        tutorial.videoId === videoId
          ? { ...tutorial, completed: !tutorial.completed }
          : tutorial
      )
    );
  };

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Custom CSS for gold colors */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .text-gold { color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .bg-light-gold { background-color: #F5EFD5; }
        .hover-gold:hover { background-color: #B8860B; }
        .progress-gold::-webkit-progress-value { background-color: #D4AF37; }
        .progress-gold::-moz-progress-bar { background-color: #D4AF37; }
      `}} />

      {/* Header */}
      <header className="bg-gold p-4 text-white shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">{causeInfo.title} - Tutorials</h1>
          <p className="text-sm opacity-90">{causeInfo.description}</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-light-gold p-4 border-b border-gold">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Award size={20} className="text-gold mr-2" />
            <span className="text-sm font-medium">
              Progress: {causeInfo.completedVideos}/{causeInfo.totalVideos} tutorials completed
            </span>
          </div>
          <div className="w-48 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-gold h-2.5 rounded-full"
              style={{ width: `${(causeInfo.completedVideos / causeInfo.totalVideos) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-6">
        {/* Left: Video Player */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
          {selectedVideo && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <iframe
                width="700"
                height="400"
                src={`https://www.youtube.com/embed/${selectedVideo.url.split('be/')[1]}`}
                title="YouTube video player"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {/* Video Controls */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrevVideo}
                      disabled={tutorials.findIndex(v => v.videoId === selectedVideo?.videoId) === 0}
                      className={`p-2 rounded-full ${tutorials.findIndex(v => v.videoId === selectedVideo?.videoId) === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextVideo}
                      disabled={tutorials.findIndex(v => v.videoId === selectedVideo?.videoId) === tutorials.length - 1}
                      className={`p-2 rounded-full ${tutorials.findIndex(v => v.videoId === selectedVideo?.videoId) === tutorials.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => markAsCompleted(selectedVideo.videoId)}
                      className={`p-2 rounded-full ${selectedVideo.completed ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                      <Bookmark size={20} />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                  <div
                    className="absolute top-0 left-0 h-2 bg-gold rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  {selectedVideo.position}. {selectedVideo.title}
                </h2>

                <div className="flex items-center text-sm text-gray-500 mt-1 mb-4">
                  <Clock size={16} className="mr-1" />
                  <span>{selectedVideo.duration}</span>
                  <span className="mx-2">•</span>
                  {selectedVideo.isEnable ? (
                    <span className="flex items-center text-green-600">
                      <Eye size={16} className="mr-1" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <EyeOff size={16} className="mr-1" />
                      <span>Disabled</span>
                    </span>
                  )}
                </div>

                <p className="text-gray-600">{selectedVideo.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Tutorial List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-light-gold p-4 border-b border-gold">
              <h3 className="font-bold text-gold">Video Tutorials</h3>
              <p className="text-sm text-gray-600">Complete all tutorials to master this cause</p>
            </div>

            <div className="divide-y divide-gray-200">
              {tutorials.map(tutorial => (
                <div
                  key={tutorial.videoId}
                  onClick={() => handleVideoSelect(tutorial)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedVideo?.videoId === tutorial.videoId ? 'bg-light-gold' : ''
                    }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${tutorial.completed ? 'bg-green-100 text-green-600' : 'bg-gold text-white'
                      }`}>
                      {tutorial.completed ? <Check /> : tutorial.position}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{tutorial.title}</h4>
                        {tutorial.causeVisibility === "PREMIUM" && (
                          <Lock size={14} className="text-gold ml-1" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock size={12} className="mr-1" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}