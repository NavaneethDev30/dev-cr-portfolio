import { projects } from "@/lib/data";



type ProjectCardProps={
    title:string,
    description:string,
    video:string,
    tech:string[],
    github?:string,
    live?:string,
    category?:string
}

const ProjectCard = ({ title, description, video, tech, github, live, category }: ProjectCardProps) => {

  
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500 transition">

      {/* Video */}
      <div className="aspect-video w-full overflow-hidden relative bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="p-8">

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="text-zinc-400 mt-4">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mt-6">
          {tech.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-cyan-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-8">

          {github && (
            <a
              href={github}
              target="_blank"
              className="px-5 py-2 rounded-xl border border-white/20 text-white hover:bg-white hover:text-black transition"
            >
              GitHub
            </a>
          )}

          {live && (
            <a
              href={live}
              target="_blank"
              className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
            >
              Live Demo
            </a>
          )}

        </div>

       
      </div>
    </div>
  )
}
export default ProjectCard