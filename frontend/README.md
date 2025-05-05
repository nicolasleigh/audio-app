# 🎵 MusicFy

A **full-stack mobile music streaming app** built with **bare React Native**, complete with music uploads, playback, playlists, and secure authentication.

## 📱 Project Overview

**MusicFy** is a full-featured music streaming application developed from scratch using **bare React Native**, with a backend powered by **Node.js**, **Express**, and **MongoDB**.

Users can upload and stream audio, create playlists, manage favorites, track listening history, and follow other users. The app also supports secure authentication with email verification, password reset, and uses local audio caching for smooth offline playback.

## 🎯 Project Goals

This project was created to:

* Learn and apply **bare React Native** to understand native module integration and platform-specific setups
* Build a **secure, scalable backend** with file handling, authentication, and session management
* Design a music streaming app with **real-world features**, including playlists, user interactions, and media uploads
* Optimize audio performance via **local caching**
* Practice **DevOps** workflows with containerization and reverse proxy setup

## 🛠️ Tech Stack

### 📲 Frontend (Mobile App)

* **React Native** – mobile app development without Expo
* **React Navigation** – seamless screen transitions and routing
* **Redux** – global state management
* **React Query** – server state handling, caching, and background syncing
* **Axios** – API communication
* **AsyncStorage** – persistent storage for caching audio files locally

### 🔙 Backend

* **Node.js + Express** – REST API and server logic
* **MongoDB + Mongoose** – NoSQL database with schema modeling
* **Formidable** – file upload handling (music files & cover images)
* **Nodemailer** – email-based flows for verification and password resets
* **JWT (JSON Web Tokens)** – secure authentication & session management
* **Bcrypt** – password hashing for user security

### ⚙️ DevOps & Deployment

* **Docker** – containerized backend for consistent development & deployment
* **Caddy** – web server and reverse proxy with automatic HTTPS support

## 🌟 Key Features

* 🔒 **Authentication**
  * Email verification & password reset
  * JWT-based session handling
* 🎵 **Music Management**
  * Upload & stream music with cover images
  * Local caching for optimized playback
* 📚 **Playlists & Favorites**
  * Create & manage personal playlists
  * Mark songs as favorites
* 📈 **Listening History & Recommendations**
  * Track what users listen to
  * Suggest music based on listening habits (basic recommendation logic)
* 👥 **User Interaction**
  * Follow/unfollow users and explore shared content
