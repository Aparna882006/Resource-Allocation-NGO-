# NGOHubX

NGOHubX is a smart resource allocation and volunteer management platform designed to connect NGOs, volunteers, and communities through efficient task coordination, real-time issue reporting, and transparent workflow management.

## Overview

Many NGOs and social organizations still rely on paper surveys, spreadsheets, phone calls, and manual coordination systems. This creates delays in identifying urgent needs, assigning volunteers, and tracking task completion.

NGOHubX solves this challenge by providing a centralized digital platform where citizens can report issues, NGOs can create and manage tasks, and volunteers can complete ground-level operations efficiently.

## Key Features

## NGO Admin Panel
- NGO Registration and Secure Login
- Dashboard with Analytics and Insights
- Create, Manage, and Assign Tasks
- Verify Citizen Reports
- Volunteer Management System
- Real-Time Task Monitoring
- Performance Tracking and Reports

## Volunteer Panel
- Volunteer Registration and Login
- Personalized Dashboard
- View Assigned Tasks
- Accept Available Tasks
- Update Task Status
- Upload Completion Proof
- Notifications and Performance Tracking

## Public / Citizen Panel
- Simple Registration and Login
- Report Community Issues
- Add Urgency Level and Location
- Upload Proof Images
- Track Request Status in Real Time

## AI Integration (Google Gemini)

NGOHubX integrates Google Gemini AI to improve decision-making and efficiency.

### AI Use Cases:
- Analyze citizen reports
- Detect urgency level
- Auto-categorize issues
- Generate task summaries
- Suggest action priorities

## Example:

Citizen Input:
Food shortage in Sector 8. Around 30 families affected.

AI Output:
- Category: Food Support
- Priority: High
- Suggested Action: Immediate Distribution

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend / Cloud
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### AI Services
- Google Gemini API

### Maps & Location
- Google Maps API

### Deployment
- Vercel / Firebase Hosting

## System Workflow

1. Citizen reports a community issue
2. Gemini AI analyzes urgency and category
3. NGO reviews request
4. NGO converts request into task
5. Volunteer gets assigned
6. Volunteer completes task
7. NGO verifies proof
8. Dashboard analytics update

## Project Structure

```text
index.html
login.html
ngo-dashboard.html
create-task.html
manage-tasks.html
manage-volunteers.html
analytics.html

volunteer-dashboard.html
volunteer-tasks.html
volunteer-profile.html
volunteer-notifications.html

citizen-dashboard.html
report-issue.html

style.css
dashboard.css
firebase.js
auth.js
