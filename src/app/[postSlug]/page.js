import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import CodeSnippet from "@/components/CodeSnippet";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

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
  const { content, frontmatter } = await loadBlogPost(postSlug);

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
