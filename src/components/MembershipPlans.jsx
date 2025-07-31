import "./MembershipPlans.css";
import { membershipPlan } from "../constants";
import { Tick } from "../assets";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const MembershipPlans = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    return (
        <div className="membership-section bg-animation">

            <div className="membership-heading font-heading-white">Membership Plans</div>
            <div className="membership-plans">
                {membershipPlan.map((plan, index) => (
                    <div key={index} className="each-plan">

                        <div className="membership-plan-header">
                            <div>
                                <div className="membership-img">
                                    <img src={plan.planIcon} alt="img" />
                                </div>
                                <div className="membership-plan-name">
                                    {plan.name}
                                </div>
                                <div className="membership-plan-price font-paragraph-white">
                                    {plan.price}
                                </div>

                            </div>
                        </div>

                        <div className="membership-btn-section">
                            <div className="membership-btn" onClick={isLoggedIn ? ()=>navigate(membershipPlan[index].navigate) : ()=>navigate('/login')} >
                                Get Started
                            </div>

                        </div>


                        <div className="membership-feature-section">
                            <hr />
                            {plan.features.map((feature, index) => (
                                <div key={index} className="features font-paragraph-white">
                                    <img src={Tick} alt="tick"/>

                                    {feature}
                                </div>
                            ))}

                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
}

export default MembershipPlans;
