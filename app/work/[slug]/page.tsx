import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectNav, projects } from "@/content/site";
import { ProjectView } from "@/components/project-view";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { index, total, next } = getProjectNav(slug);
  if (!next) notFound();

  return <ProjectView project={project} index={index} total={total} next={next} />;
}
