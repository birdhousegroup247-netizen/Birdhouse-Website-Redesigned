const VIDEO_ID = 'dK9QrvWZF50';

interface YouTubeShortEmbedProps {
  className?: string;
  darkFrame?: boolean;
}

export function YouTubeShortEmbed({
  className = '',
  darkFrame = false
}: YouTubeShortEmbedProps) {
  return (
    <div
      className={`aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-3xl border shadow-2xl ${
        darkFrame
          ? 'border-white/15 bg-black shadow-black/40'
          : 'border-gray-200 bg-surface-primary shadow-black/10 dark:border-zinc-700 dark:bg-[#17191b] dark:shadow-black/40'
      } ${className}`}>

      <iframe
        src={`https://www.youtube.com/embed/${VIDEO_ID}`}
        title="Client feedback from Mrs Mba Angela"
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen />
    </div>
  );
}
