import { getVideoId } from '@/utils/getVideoId';

interface VideoEmbedProps {
  value: {
    url: string;
    caption?: string;
  };
}

export default function VideoEmbed({ value }: VideoEmbedProps) {
  const { url, caption } = value;

  if (!url) {
    return null;
  }

  const videoInfo = getVideoId(url);

  if (!videoInfo) {
    return (
      <div className="my-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Unable to embed video from: {url}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Watch video →
        </a>
      </div>
    );
  }

  const embedUrl =
    videoInfo.platform === 'youtube'
      ? `https://www.youtube.com/embed/${videoInfo.id}`
      : `https://player.vimeo.com/video/${videoInfo.id}`;

  return (
    <div className="my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption || 'Video'}
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
}
