import React from 'react'
import BookDashboardNavbar from './BookDashboardNavbar'
import "./BookDashboardAiFeature.css"

export default function BookDashboardAiFeature({ currentSection, handleSectionChange }) {

    let response = [
        {
            heading: "Generated Data dolor sit amet, consectetuer sed diam nonummy ",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            heading: "Generated Data dolor sit amet, consectetuer sed diam nonummy ",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            heading: "Generated Data dolor sit amet, consectetuer sed diam nonummy ",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ]
    return (
        <div className='ai-feature-sec-parent'>
            <BookDashboardNavbar currentSection={currentSection} handleSectionChange={handleSectionChange} />
            <div className="mobile-ai-side-buttons">
                <div>
                    <div className='mobile-ai-side-buttons-units'>Units 1 <div className='mobile-ai-side-buttons-units-percentage'>75%</div> <div>&gt;</div></div>
                </div>
                <div>
                    <div className='mobile-ai-side-buttons-history'>History <div>&gt;</div></div>
                </div>

            </div>
            <div className='mobile-ai-syllabus-filter'>
                <div> Filter</div>
                <select className='ai-feature-select-input' name="" id="">
                    <option value="1">None</option>
                    <option value="2">1</option>
                    <option value="3">2</option>
                    <option value="4">3</option>
                </select>
            </div>
            <div className="ai-feature-sec">
                <div className="ai-feature-banner">
                    <div className="ai-feature-banner-text">
                        <p className='ai-feature-banner-text-heading'>AI Insights: Connecting for Answers</p>
                        <p className='ai-feature-banner-text-subheading'>Generate AI-based responses for fast preparation towards your deadline. Fill in the necessary details and create a polished result!</p>
                    </div>
                </div>
                <div className='ai-feature-banner-input'>
                    <div className='ai-feature-banner-input-days-hours'>
                        <div className='ai-feature-banner-input-days-hours-days'>Days <span> <select className="ai-feature-select-input" name="" id="">
                            <option value="1">None</option>
                            <option value="2">1</option>
                            <option value="3">2</option>
                            <option value="4">3</option>
                        </select></span></div>
                        <div className='ai-feature-banner-input-days-hours-hours'>Hours <span> <select className="ai-feature-select-input" name="" id="">
                            <option value="1">None</option>
                            <option value="2">1</option>
                            <option value="3">2</option>
                            <option value="4">3</option>
                        </select></span></div>
                    </div>
                    <div className='ai-feature-banner-input-marks'>
                        <div className='ai-feature-banner-input-marks-marks'>Marks to be obtained <span> <select className="ai-feature-select-input" name="" id="">
                            <option value="1">None</option>
                            <option value="2">1</option>
                            <option value="3">2</option>
                            <option value="4">3</option>
                        </select></span></div>
                    </div>
                </div>
                <div className='ai-feature-banner-input-generate'>
                    <button className='bg-animation'>Generate</button>
                </div>
            </div>
            <div className="ai-content-response-section">
                <div className="ai-content-response-analytics">
                    <div className="ai-content-response-analytics-date">10 July 2024</div>
                    <div className="ai-content-analytics-details">
                        <div className="ai-content-analytics-details-days">Days <span>1 Day</span></div>
                        <div className="ai-content-analytics-details-hours">Hours <span>5 Hours</span></div>
                        <div className="ai-content-analytics-details-marks ai-content-analytics-details-marks-desktop">Marks <span>50-70 Marks</span></div>
                    </div>
                    <div className="ai-content-analytics-details-marks ai-content-analytics-details-marks-mobile">Marks <span>50-70 Marks</span></div>

                </div>

                {
                    response.map((item, index) => (
                        <div className="ai-content-response-generated-data">
                            <div className="ai-content-response-generated-data-heading">
                                <p>{index + 1}. {item.heading} </p>
                            </div>
                            <div className="ai-content-generated-text">
                                <p>{item.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
