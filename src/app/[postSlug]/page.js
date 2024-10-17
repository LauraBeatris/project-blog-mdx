import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  if (!blogPost) {
    return null;
  }

  const { frontmatter } = blogPost;

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

const components = {
  pre: (props) => <CodeSnippet {...props} />,
  DivisionGroupsDemo: DivisionGroupsDemo,
  CircularColorsDemo: CircularColorsDemo,
};

async function BlogPost({ params }) {
  const { postSlug } = params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    notFound();
  }

  const { content, frontmatter } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}

export default BlogPost;
