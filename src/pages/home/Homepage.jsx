import React, { useEffect, useState } from 'react';
import ReadmoreButton from '../../Components/ReadmoreButton';
import CarouselHome from '../../Components/CarousalHome';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Homepage = ({
  fetchDashboardAnalytics,
  fetchAllPosts,
  posts,
  isLoading,
}) => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTeachers([
      { image: '/profile.png', name: 'Kishor parajuli' },
      { image: '/profile.png', name: 'Shiva bastakoti' },
      { image: '/profile.png', name: 'Rajan chaudhary' },
      { image: '/profile.png', name: 'Sandesh dhungana' },
      { image: '/profile.png', name: 'Barsha rijal' },
      { image: '/profile.png', name: 'Kalyan shivakoti' },
      { image: '/profile.png', name: 'Bhuwan sanjyal' },
    ]);
  }, []);

  const [dashboardAnalytics, setDashboardAnalytics] = useState(undefined);

  useEffect(() => {


  }, []);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section>
        <CarouselHome />
      </section>

      {/* School Analytics */}
      <section className="school-analytics">
        <div className="analytics-card">
          <CountUp start={0} end={23} duration={3} />
          <span> Professional Teachers</span>
        </div>
        <div className="analytics-card">Updated Courses</div>
        <div className="analytics-card">
          <CountUp start={0} end={500} duration={3} />
          <span> Registered Students</span>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="posts-container">
        <div className="posts">
          <h2 className="section-title">Latest Posts</h2>
          {posts?.length > 0 &&
            posts?.map((post, index) => {
              if (index < 3) {
                return (
                  <div key={post._id} className="post">
                    <img
                      src={post.postImageUrl[0]}
                      alt={`Error while showing image.`}
                      className="post-img"
                    />
                    <p className="post-title">{post.postTitle[0]}</p>
                    <p className="post-text">{post.postContent[0]}</p>
                    <ReadmoreButton post={post} />
                  </div>
                );
              }
            })}
          <Button
            style={{
              position: 'absolute',
              right: '1rem',
            }}
            onClick={() => navigate('/all-posts')}
            type="primary"
          >
            Show all posts
          </Button>
        </div>

        {/* Side Information */}
        <aside className="posts-sidediv">
          <div className="why-us">
            <h2>Why Us?</h2>
            <p>
              We provide world-class education with professional teachers,
              advanced courses, and excellent facilities for all-round
              development.
            </p>
          </div>
          <div className="intro-div">
            <h2>Introduction</h2>
            <p>
              Welcome to Shangrila International School. Our mission is to
              nurture future leaders with knowledge, integrity, and creativity.
            </p>
          </div>

          {/* Principal's Message */}
          <div className="principal-message">
            <div className="message-header">
              <img
                src="/profile.png"
                alt="Principal"
                className="message-image"
              />
              <h2>Message from the Principal</h2>
            </div>
            <p>
              As the Principal of Shangrila International School, it is my
              privilege to lead an institution committed to excellence in
              education. We foster an environment where every student is valued,
              challenged, and inspired to reach their fullest potential.
            </p>
          </div>

          {/* Vice Principal's Message */}
          <div className="vice-principal-message">
            <div className="message-header">
              <img src="/profile.png" className="message-image" />
              <h2>Message from the Vice Principal</h2>
            </div>
            <p>
              At Shangrila, we believe in holistic development. As Vice
              Principal, I am dedicated to nurturing an environment where
              students not only excel academically but also grow as responsible
              individuals prepared for a dynamic world.
            </p>
          </div>
        </aside>
      </section>

      {/* Vision and Mission
            <section className="vision-mission-section">
                <div className="vision">
                    <h2>Our Vision</h2>
                    <img src="/vision.jpg" alt="Vision" className="animated-image" />
                    <p>
                        Our vision is to create a learning environment where students excel academically and develop essential life skills.
                    </p>
                </div>
                <div className="mission">
                    <h2>Our Mission</h2>
                    <img src="/mission.jpg" alt="Mission" className="animated-image" />
                    <p>
                        Our mission is to provide quality education and inspire students to become responsible citizens and leaders.
                    </p>
                </div>
            </section> */}

      {/* Teacher Testimonials */}
      <section className="testimonial-section">
        <h2 className="section-title">What Our Teachers Say</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
        >
          {teachers.map((teacher, index) => (
            <SwiperSlide key={index} className="testimonial-card">
              <div className="testimonial-content">
                <img
                  src={teacher.image || '/default-avatar.jpg'}
                  alt={teacher.name}
                  className="testimonial-image"
                />
                <h3>{teacher.name}</h3>
                <p className="testimonial-text">{teacher.testimonial}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

const mapStateToProps = ({
  rootReducer: {
    dashboard: { isLoading },
    posts: { posts },
  },
}) => ({
  isLoading,
  posts,
});

export default Homepage
