import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(utc)
dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)

switch (navigator.language) {
  case 'ko':
  case 'ko-KR':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif KR')
    break
  case 'zh':
  case 'zh-CN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200..900&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif SC')
    break
  case 'zh-TW':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif TC')
    break
  case 'ar':
  case 'fa-IR':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Naskh Arabic')
    break
  case 'ja':
  case 'ja-JP':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif JP')
    break
  case 'hi-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Devanagari')
    break
  case 'bn-BD':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Bengali')
    break
  case 'ur-PK':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Arabic:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Arabic')
    break
  case 'pa-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gurmukhi:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Gurmukhi')
    break
  case 'ta-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Tamil:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Tamil')
    break
  case 'te-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Telugu')
    break
  case 'mr-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Devanagari')
    break
  case 'gu-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gujarati:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Gujarati')
    break
  case 'ml-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Malayalam:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Malayalam')
    break
  case 'kn-IN':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Kannada')
    break
  case 'my-MM':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Myanmar:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Myanmar')
    break
  case 'th-TH':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Thai')
    break
  case 'lo-LA':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Lao:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Lao')
    break
  case 'km-KH':
    document.head.innerHTML +=
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+Khmer:wght@400..700&display=swap">'
    document.documentElement.style.setProperty('--locale-font', 'Noto Serif Khmer')
    break
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
