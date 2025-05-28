import React, { useEffect, useState } from 'react';
import ReadmoreButton from '../../Components/ReadmoreButton';
import CarouselHome from '../../Components/CarousalHome';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { baseUrl } from '../../utils/constant';
import toast from 'react-hot-toast';

const Homepage = ({
  fetchDashboardAnalytics,
  fetchAllPosts,
  posts,
  isLoading,
}) => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [notices, setNotices] = useState(undefined);

  const fetchNotices = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(baseUrl + 'getNotice.php?page=1&page_size=2', {
        method: 'POST',
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        setNotices(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchNotices();
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
          {notices?.map((notice) => {
            const isTypePdf =
              notice.file_url && notice.file_url.endsWith('.pdf');
            const fullFileUrl = baseUrl + notice.file_url;
            //if not pdf then it is image
            return (
              <div
                key={notice.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* <h2>{notice.title}</h2>
                     }
                       {/* <h2>{notice.title}</h2>
                     <p className="notice-date">Date: {notice.created_at}</p>
                     <p>{notice.description}</p> */}
                <h2>{notice.title}</h2>
                <p
                  style={{
                    color: '#555',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    margin: '5px 0',
                  }}
                >
                  Posted on: {new Date(notice.created_at).toLocaleDateString()}
                </p>
                <p>{notice.description}</p>
                {isTypePdf ? (
                  // <a
                  //   href={fullFileUrl}
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  //   className="notice-link"
                  // >
                  //   Read PDF File
                  // </a>

                  <div>
                    <p className="notice-link">
                      <a
                        href={fullFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Full Screen
                      </a>
                    </p>
                    <br />
                    <iframe
                      src={fullFileUrl}
                      title={notice.title}
                      style={{
                        width: '100%',
                        height: '800px',
                        border: 'none',
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={fullFileUrl}
                    alt={notice.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </div>
            );
          })}
          <Button
            style={{
              position: 'absolute',
              right: '1rem',
            }}
            onClick={() => navigate('/notices')}
            type="primary"
          >
            View all notices
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
                src="./profile.png"
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
              <img src="./profile.png" className="message-image" />
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
                    <img src="./vision.jpg" alt="Vision" className="animated-image" />
                    <p>
                        Our vision is to create a learning environment where students excel academically and develop essential life skills.
                    </p>
                </div>
                <div className="mission">
                    <h2>Our Mission</h2>
                    <img src="./mission.jpg" alt="Mission" className="animated-image" />
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
          className="testimonial-swiper"
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

export default Homepage;
