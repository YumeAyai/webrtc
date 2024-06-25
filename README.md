# Screen Sharing Demo

## Introduction

This application allows users to share their screens through a web interface. It
consists of two main components: the Sender and the Receiver. The Sender
initiates the screen sharing, and the Receiver views the shared screen.

## Features

- **Screen Sharing:** The Sender can share their screen by clicking a button.
- **WebRTC Connection:** Establishes a WebRTC connection between the Sender and
  Receiver to transmit the screen stream.
- **WebSocket Signaling:** Uses WebSocket for signaling messages to establish
  and manage the WebRTC connection.

## Setup

### Prerequisites

- Node.js installed
- A WebSocket server for signaling

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YumeAyai/webrtc.git
   cd webrtc
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run:

   ```bash
   npm run server # run ws server
   npm run dev    # run demo
   ```

## Usage

1. Open the application in a browser.
2. The Sender should click the "Start Screen Sharing" button to initiate screen
   sharing.
3. The Sender then clicks the "Send Screen" button to send the screen stream to
   the Receiver.
4. The Receiver will automatically display the shared screen once it receives
   the stream.

## Code Explanation

### Sender Component

- **startScreenSharing:** Requests access to the user's screen and sets the
  video stream.
- **createOffer:** Creates an offer to start the WebRTC connection and sends it
  to the Receiver through WebSocket.
- **handleReceiveAnswer:** Sets the remote description when an answer is
  received from the Receiver.
- **handleReceiveIceCandidate:** Adds ICE candidates to establish the WebRTC
  connection.

### Receiver Component

- **handleReceiveOffer:** Sets the remote description and creates an answer when
  an offer is received from the Sender.
- **handleReceiveIceCandidate:** Adds ICE candidates to establish the WebRTC
  connection.
- **ontrack:** Sets the received video stream to the video element.

## License

This project is licensed under the MIT License.

---

# 屏幕共享应用程序

## 简介

该应用程序允许用户通过网络界面共享他们的屏幕。它包含两个主要组件：发送端和接收端。发送端发起屏幕共享，接收端查看共享的屏幕。

## 特性

- **屏幕共享:** 发送端可以通过点击按钮共享他们的屏幕。
- **WebRTC 连接:** 建立发送端和接收端之间的 WebRTC 连接，以传输屏幕流。
- **WebSocket 信令:** 使用 WebSocket 进行信令消息的传递，以建立和管理 WebRTC
  连接。

## 安装

### 前提条件

- 已安装 Node.js
- 一个用于信令的 WebSocket 服务器

### 安装步骤

1. 克隆仓库：

   ```bash
   git clone https://github.com/YumeAyai/webrtc.git
   cd webrtc
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 运行：

   ```bash
   npm run server # 启动信令服务器
   npm run dev    # 启动演示
   ```

## 使用方法

1. 在浏览器中打开应用程序。
2. 发送端点击“开始屏幕共享”按钮以启动屏幕共享。
3. 发送端点击“发送屏幕”按钮将屏幕流发送到接收端。
4. 接收端接收到流后将自动显示共享的屏幕。

## 代码解释

### 发送端组件

- **startScreenSharing:** 请求访问用户的屏幕并设置视频流。
- **createOffer:** 创建一个 offer 以启动 WebRTC 连接，并通过 WebSocket
  将其发送到接收端。
- **handleReceiveAnswer:** 接收到来自接收端的 answer 时，设置远程描述。
- **handleReceiveIceCandidate:** 添加 ICE 候选者以建立 WebRTC 连接。

### 接收端组件

- **handleReceiveOffer:** 接收到来自发送端的 offer 时，设置远程描述并创建
  answer。
- **handleReceiveIceCandidate:** 添加 ICE 候选者以建立 WebRTC 连接。
- **ontrack:** 将接收到的视频流设置到视频元素。

## 许可

该项目是根据 MIT 许可证授权的。
