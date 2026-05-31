import logo from "@/public/images/logo.png";
import fb from "@/public/images/fb.png";
import tt from "@/public/images/tt.png";
import x from "@/public/images/x.png";
import sp from "@/public/images/sp.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import blogDetails from "@/public/images/blog-details.png";
import { blogData } from "@/public/blogdata";
import { formatString } from "@/utils/formatString";
import DetailsVideo from "@/components/DetailsVideo";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    title: formatString(blog.title),
  }));
}

const BlogDetailsPage = ({ params }: { params: { title: string } }) => {
  const blog = blogData.find((blog) => formatString(blog.title) === params.title);
  return (
    <>
      <header className="header-blog">
        <div className="container d-flex flex-wrap gap-4 align-items-center justify-content-between">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <Link href="/" className="d-flex align-items-center gap-2">
            {" "}
            <i className="ph ph-arrow-left"></i> Back to Home
          </Link>
        </div>
      </header>

      {/* <!-- main content --> */}
      <main>
        {/* <!-- Blog Details --> */}
        <section className="blog-details">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-xxl-3">
                <div className="details-left">
                  <div className="info-box">
                    <h4>Article Information</h4>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-tag fs-5"></i>
                        <p>
                          <span className="fw-medium">Category</span>: Inspiration
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-clock fs-5"></i>
                        <p>
                          <span className="fw-medium">Updated</span>: March 16, 2024
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-user fs-5"></i>
                        <p>
                          <span className="fw-medium">Author</span>: Jenny Wilson
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-alarm fs-5"></i>
                        <p>
                          <span className="fw-medium">Reading Time</span>: 2 min
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="info-box">
                    <h4>Tabe of Contents</h4>
                    <div id="blog-index" className="d-flex flex-column gap-2 table-of-content">
                      <a href="#title">Title</a>
                      <a href="#understanding">Understanding Your Brand Identity</a>
                      <a href="#crafing">Crafting a Compelling About Page</a>
                      <a href="#showcasing">showcasing Your Best Work</a>
                      <a href="#conclusion">Conclusion</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-xxl-9 d-flex flex-column gap-4" data-bs-spy="scroll" data-bs-target="#blog-index" data-bs-smooth-scroll="true">
                <div className="details-container">
                  <div className="details-content">
                    <div id="title" className="row align-items-center g-4 mb-4 mb-xl-5">
                      <div className="col-md-6">
                        <Image src={blog?.image as StaticImageData} className="img-fluid w-100 rounded-3" alt="" />
                      </div>
                      <div className="col-md-6">
                        <h3 className="mb-3 fw-medium">{blog?.title}</h3>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ph ph-calendar fs-4"></i>
                          <p>
                            <span className="fw-medium">Updated</span>: {blog?.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg mb-4 mb-xl-5">
                      In today&amp;s digital age, a well-crafted portfolio website is more than just a showcase of your work—it&amp;s a powerful tool for building your personal brand. Whether you&amp;re a designer, developer, writer, or artist, your portfolio can help you stand out in a crowded
                      market and attract the right opportunities. In this blog,
                    </p>
                    <h4 id="understanding" className="fw-medium mb-3">
                      Understanding Your Brand Identity
                    </h4>
                    <p className="text-lg mb-4 mb-xl-5">
                      Before you start building your portfolio, take the time to define your brand identity. What are your core values, strengths, and unique selling points? Your portfolio should reflect who you are as a professional and communicate your story to your audience.
                    </p>

                    <DetailsVideo />
                    <div id="crafing" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">Crafting a Compelling About Page</h5>
                      <p className="text-lg">
                        Your About page is one of the most crucial sections of your portfolio. It&amp;s the space where visitors get to know the person behind the work—the story, the journey, and the passion that drives your creativity. Use this opportunity to introduce yourself in a way that
                        resonates with your audience,
                        <br />
                        <br />
                        offering a glimpse into not just what you do, but who you are. Begin by highlighting your background and experiences. Share your professional journey, from how you got started to where you are today. Discuss the skills and expertise you&amp;ve developed over the years, and
                        how they have shaped your approach to your work. If there are any pivotal moments or significant projects that have defined your career, this is the place to share them.
                      </p>
                    </div>
                    <div id="showcasing" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">Showcasing Your Best Work</h5>
                      <p className="text-lg">
                        Your portfolio should feature a carefully curated selection of your most outstanding work, showcasing your unique skills and expertise in a way that resonates with potential clients or employers. Instead of overwhelming visitors with an exhaustive list of projects, it&amp;s
                        important to focus on a select few that truly represent the breadth and depth of your abilities. These chosen projects should not only highlight your technical skills but also demonstrate your problem-solving abilities, creativity, and the impact your work has had. For each
                        project,
                        <br />
                        <br />
                        provide detailed context to help viewers understand the scope and significance of your contribution. Include descriptions that clearly outline your role in the project—whether you led the design, development, strategy, or a combination of these. Explain the challenges you
                        faced, the solutions you implemented, and how your efforts contributed to the project’s success. Highlight any innovative approaches you used, the technologies you leveraged, and the results achieved, such as improved performance metrics, enhanced user experience, or
                        increased client satisfaction.
                      </p>
                    </div>
                    <div className="quote">the challenges you faced, and the outcomes you achieved. This not only demonstrates your capabilities but also gives insight into your problem-solving approach.</div>
                    <p className="mb-4 mb-xl-5">A blog is a powerful addition to your portfolio website. Regularly publishing blog posts allows you to share your knowledge, insights, and opinions on industry-related topics.</p>
                    <div className="mb-4 mb-xl-5">
                      <Image src={blogDetails} className="img-fluid w-100 rounded-3" alt="" />
                    </div>
                    <div id="conclusion" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">Conclusion</h5>
                      <p className="text-lg">
                        Your portfolio website is more than just a collection of your work; it’s a reflection of your personal brand. By carefully crafting your site, showcasing your best work, and regularly blogging, you can establish yourself as an expert in your field and attract the right
                        opportunities. Remember, your portfolio is an evolving project—continue to update it as you grow and develop in your career.
                      </p>
                    </div>
                    <div className="share py-4">
                      <div className="d-flex gap-3 align-items-center justify-content-center mb-4">
                        <p>Follow Me</p>
                        <div className="d-flex gap-3">
                          <a href="#">
                            <Image src={fb} alt="" />
                          </a>
                          <a href="#">
                            <Image src={tt} alt="" />
                          </a>
                          <a href="#">
                            <Image src={x} alt="" />
                          </a>
                          <a href="#">
                            <Image src={sp} alt="" />
                          </a>
                        </div>
                      </div>
                      <form>
                        <input type="text" value="Portify-?node-id=0-1&t=3MUWkaOWKQ0TLoKa-0" disabled />
                        <button>Copy Link</button>
                      </form>
                    </div>
                  </div>
                  <div className="next-prev">
                    <a href="#" className="article-card">
                      <button>
                        <i className="ph ph-arrow-left"></i>
                      </button>
                      <div>
                        <p className="fw-medium mb-1">Previous Article</p>
                        <h5 className="fw-medium">The Evolution of My Design Style Over Time</h5>
                      </div>
                    </a>
                    <div className="divider d-none d-md-block"></div>
                    <a href="#" className="article-card right">
                      <div>
                        <p className="fw-medium mb-1">Next Article</p>
                        <h5 className="fw-medium">The Evolution of My Design Style Over Time</h5>
                      </div>
                      <button>
                        <i className="ph ph-arrow-left"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- newsletter --> */}
        <section className="newsletter">
          <div className="container">
            <div className="content">
              <h2 className="mb-3 fw-medium">Subscribe our newsletter</h2>
              <p className="mb-4 pb-2">Technology blogging, captivating your audience goes beyond just the written word.</p>
              <form className="mb-3">
                <input type="text" placeholder="Enter your email address" />
                <button>Subscribe</button>
              </form>
              <div>
                <label htmlFor="agree" className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="agree" />
                  <p>
                    I agree with{" "}
                    <a href="#" className="underlined">
                      Privacy Policy
                    </a>{" "}
                    &amp;{" "}
                    <a href="#" className="underlined">
                      Terms
                    </a>
                  </p>
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="contaner">
          <div className="d-flex justify-content-center gap-3">
            <p>
              Copyright @ <span id="year"></span> Portify
            </p>
            <p>|</p>
            <p>
              Designed By <a href="#">Pixelaxis</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BlogDetailsPage;
