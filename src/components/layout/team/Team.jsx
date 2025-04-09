import React from 'react';
import './Team.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

// Импорты изображений
import teamMember1 from '../../../assets/team-member-1.jpg';
import teamMember2 from '../../../assets/team-member-2.jpg';
import teamMember3 from '../../../assets/team-member-3.jpg';
import teamMember4 from '../../../assets/team-member-4.jpg';
import teamMember5 from '../../../assets/team-member-5.jpg';
import teamMember6 from '../../../assets/team-member-6.jpg';
import teamMember7 from '../../../assets/team-member-7.jpg';

const Team = () => {
    const { t, ready } = useTranslation('about');

    if (!ready) return <div className="loading">{t('common:loading')}</div>;

    const teamData = t('team', { returnObjects: true });
    const members = teamData.members;

    const teamMembers = Object.values(members).map((member, index) => ({
        ...member,
        photo: [teamMember1, teamMember2, teamMember3, teamMember4,
            teamMember5, teamMember6, teamMember7][index]
    }));

    return (
        <section className="team" aria-labelledby="team-title">
            <h2 id="team-title" className="team__title title">{teamData.title}</h2>
            <p className="team__description text">{teamData.description}</p>

            <div className="team__swiper">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 25
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}
                    aria-label="Team members"
                >
                    {teamMembers.map((member, index) => (
                        <SwiperSlide key={index}>
                            <div className="team__card">
                                <img
                                    src={member.photo}
                                    alt={`Portrait of ${member.name}`}
                                    className="team__card-image"
                                    loading="lazy"
                                />
                                <h3 className="team__card-name subtitle">{member.name}</h3>
                                <p className="team__card-position">{member.position}</p>
                                <p className="team__card-description">{member.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Team;