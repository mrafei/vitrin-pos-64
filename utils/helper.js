/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import videoExtensions from 'video-extensions';
import imageExtensions from 'image-extensions';
import moment from 'moment-jalaali';
import {
  DEFAULT_THEME_COLOR,
  defaultSections,
  FONT_1
} from './themeConfig/constants';

function getWeekDay(dayId) {
  const weekDays = [
    { id: '1', description: 'دوشنبه' },
    { id: '2', description: 'سه‌شنبه' },
    { id: '3', description: 'چهارشنبه' },
    { id: '4', description: 'پنج‌شنبه' },
    { id: '5', description: 'جمعه' },
    { id: '6', description: 'شنبه' },
    { id: '7', description: 'یک‌شنبه' }
  ];
  return weekDays.find(day => day.id === dayId)
    ? weekDays.find(day => day.id === dayId).description
    : null;
}

function getCalendarWeekDay(dayId) {
  const weekDays = [
    { id: 1, description: 'دوشنبه' },
    { id: 2, description: 'سه‌شنبه' },
    { id: 3, description: 'چهارشنبه' },
    { id: 4, description: 'پنج‌شنبه' },
    { id: 5, description: 'جمعه' },
    { id: 6, description: 'شنبه' },
    { id: 0, description: 'یک‌شنبه' }
  ];
  return weekDays.find(day => day.id === dayId)
    ? weekDays.find(day => day.id === dayId).description
    : null;
}

function getMonthName(monthId) {
  const months = [
    { id: 1, description: 'فروردین' },
    { id: 2, description: 'اردیبهشت' },
    { id: 3, description: 'خرداد' },
    { id: 4, description: 'تیر' },
    { id: 5, description: 'مرداد' },
    { id: 6, description: 'شهریور' },
    { id: 7, description: 'مهر' },
    { id: 8, description: 'آبان' },
    { id: 9, description: 'آذر' },
    { id: 10, description: 'دی' },
    { id: 11, description: 'بهمن' },
    { id: 12, description: 'اسفند' }
  ];
  return months.find(month => month.id === monthId)
    ? months.find(month => month.id === monthId).description
    : null;
}

function devideArraysIntoGroups(arr = [], devideTo) {
  const rowsNumber = Math.ceil(arr.length / devideTo);
  const arrayRows = [];

  for (let i = 0; i < rowsNumber; i += 1) {
    const row = [];
    for (let j = 0; j < devideTo; j += 1) {
      if (arr[devideTo * i + j]) {
        row.push(arr[devideTo * i + j]);
      } else {
        row.push(null);
      }
    }

    arrayRows.push(row);
  }

  return arrayRows;
}

function englishNumberToPersianNumber(num) {
  const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  if (num && num.toString())
    return num.toString().replace(/[0-9]/g, w => id[+w]);
  return '۰';
}

function reverseLabelToWorkingDays(id) {
  switch (+id) {
    case 1:
      return '6';
    case 2:
      return '7';
    case 3:
      return '1';
    case 4:
      return '2';
    case 5:
      return '3';
    case 6:
      return '4';
    case 7:
      return '5';
    default:
      return '1';
  }
}

function addCommaToPrice(num) {
  if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return 0;
}

function calculateDiscountPercent(initialPrice, discountedPrice) {
  const discountPercent =
    ((initialPrice - discountedPrice) / initialPrice) * 100;
  return discountPercent % 1 > 0
    ? Math.round(discountPercent)
    : discountPercent;
}

const priceFormatter = price =>
  englishNumberToPersianNumber(addCommaToPrice(price));

const ellipseText = (text, length) =>
  text && text.length > length
    ? `${text.toString().substr(0, length)}...`
    : text;

function getCountDown(duration) {
  const timer = duration;
  let minutes;
  let seconds;
  let hours;
  hours = parseInt(timer / 3600, 10);
  minutes = parseInt((timer % 3600) / 60, 10);
  seconds = parseInt((timer % 3600) % 60, 10);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  if (timer - 1 < 0) {
    return null;
  }
  return `${hours}:${minutes}:${seconds}`;
}

const getSubDomain = incomingUrl => {
  const url = incomingUrl
    .replace('www.', '')
    .replace('order.', '')
    .replace('http://', '')
    .replace('https://', '');
  return url.search('localhost') > -1 ||
  url.search('healthCheck') > -1 ||
  !isNaN(url.substr(0, url.indexOf('.')))
    ? process.env.SITE_DOMAIN
    : url.substr(0, url.indexOf('.'));
};

function callPhoneNumber(phoneNumber) {
  window.location = `tel:${phoneNumber}`;
}

function googleMapsNavigate(latitude, longitude) {
  if (
    navigator.platform.indexOf('iPhone') !== -1 ||
    navigator.platform.indexOf('iPad') !== -1 ||
    navigator.platform.indexOf('iPod') !== -1
  ) {
    // if we're on iOS, open in Apple Maps
    window.location = `maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
  } else {
    // else use Google
    window.location = `https://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
  }
}

function wazeNavigate(latitude, longitude) {
  window.location = `waze://?ll=${latitude},${longitude}&navigate=yes`;
}

const isNumber = value => /^\d+$/.test(value);
const isPhoneNumber = phoneNumber =>
  phoneNumber
    ? phoneNumber.toString().length === 11 &&
    Number(phoneNumber[0]) === 0 &&
    isNumber(phoneNumber)
    : false;

const getFileExtention = filename => filename.split('.').pop();

function getFileExtensionType(extension) {
  if (videoExtensions.findIndex(ex => ex === extension) > -1) return 'video';
  if (imageExtensions.findIndex(ex => ex === extension) > -1) return 'image';
  return 'other';
}

function generateTimeRange(minuteInterval) {
  const x = minuteInterval; // minutes interval
  const times = []; // time array
  let tt = 30; // start time
  // const ap = ['AM', 'PM']; // AM-PM

  // loop to increment the time and push results in array
  for (let i = 0; tt <= 24 * 60; i += 1) {
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = tt % 60; // getting minutes of the hour in 0-55 format
    const hour =
      hh % 24 >= 10
        ? (hh % 24).toString().slice(-2)
        : `0${(hh % 24).toString().slice(-2)}`;
    const minute =
      mm >= 10 ? mm.toString().slice(-2) : `0${mm.toString().slice(-2)}`;
    if (tt === 24 * 60)
      times[i] = {
        value: `23:59`,
        label: englishNumberToPersianNumber(`23:59`)
      };
    else
      times[i] = {
        value: `${hour}:${minute}`,
        label: englishNumberToPersianNumber(`${hour}:${minute}`)
      };
    tt += x;
  }
  return times;
}

function correctWorkHoursFormat(_workHours) {
  if (_workHours) {
    const newWorkHours = {};
    Object.keys(_workHours).map(label => {
      const day = _workHours[label];
      newWorkHours[label] = day.map(d => ({
        from: removeSecondsFromDateString(d.from),
        to: removeSecondsFromDateString(d.to)
      }));
      return false;
    });
    return newWorkHours;
  }
  return {};
}

function removeSecondsFromDateString(date) {
  if (date) {
    const secondColonInDateStringIndex = date.lastIndexOf(':');
    let newDateString = null;
    if (secondColonInDateStringIndex) {
      newDateString = date.substr(0, secondColonInDateStringIndex);
    }
    return newDateString;
  }
  return null;
}

function noOp() {
}

function persianToEnglishNumber(number) {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g
  ];
  if (typeof number === 'string') {
    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-param-reassign
      number = number
        .replace(persianNumbers[i], i)
        .replace(arabicNumbers[i], i);
    }
  }
  return number;
}

const businessSerializer = _business => ({
  ..._business,
  posts: [
    ..._business.images.map(image => ({ ...image, type: 'image' })),
    ..._business.videos.map(video => ({ ...video, type: 'video' }))
  ],
  theme_config: {
    ..._business.theme_config,
    sections_skeleton:
      _business.theme_config.sections_skeleton || defaultSections(),
    font: _business.theme_config.font || FONT_1,
    theme_color: _business.theme_config.theme_color || DEFAULT_THEME_COLOR
  },
  work_hours: correctWorkHoursFormat(_business.working_hours)
});


function getQueryParams(query, url) {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(query);
}

function matomoEventCall(category, name, value) {
  // eslint-disable-next-line no-undef
  _paq.push(['trackEvent', category, name, value]);
}

function handleKeyDown(ev, onClick) {
  if (ev.keyCode === 13) {
    onClick(ev);
  }
}

function useOutsideAlerter(ref, closeControls) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      closeControls();
    }
  }

  // Bind the event listener
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('touchstart', handleClickOutside);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
  };
}

function useForm(form) {
  const [_form, _setForm] = useState(form);

  function setFormValue(e) {
    _setForm({ ..._form, [e.target.name]: e.target.value });
  }

  return [_form, setFormValue];
}

function useCustomForm(form) {
  const [_form, _setForm] = useState(form);

  function setFormValue(name, value) {
    if (typeof name === 'object') {
      _setForm(name);
    } else {
      _setForm({ ..._form, [name]: value });
    }
  }

  return [_form, setFormValue];
}

const validateDomain = domain =>
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/.test(domain);

function isBusinessOpenNow(workingHours) {
  const nowDate = new Date();
  const label = Object.keys(workingHours).find(
    l => parseInt(l, 10) % 7 === nowDate.getDay()
  );
  const day = workingHours[label];
  if (day) {
    if (!day.length) return false;
    const result = day.filter(shift => {
      const fromHour = parseInt(shift.from.split(':')[0], 10);
      const toHour = parseInt(shift.to.split(':')[0], 10);
      const fromMinute = parseInt(shift.from.split(':')[1], 10);
      const toMinute = parseInt(shift.to.split(':')[1], 10);
      const nowHour = nowDate.getHours();
      const nowMinute = nowDate.getMinutes();

      return (
        nowHour * 60 + nowMinute >= fromHour * 60 + fromMinute &&
        nowHour * 60 + nowMinute <= toHour * 60 + toMinute
      );
    });
    return Boolean(result.length);
  }
  return true;
}

function getAvailableDeliveryTimes(
  customDeliveryTimes = {},
  today
) {
  let nextWeekDeliveryTimes = [
    {
      date: today.format('jYYYY/jM/jD'),
      weekDay: today.day() ? String(today.day()) : '7',
      shifts: []
    }
  ];
  for (let i = 0; i < 6; i += 1) {
    const nextDay = today.add(1, 'day');
    nextWeekDeliveryTimes.push({
      date: nextDay.format('jYYYY/jM/jD'),
      weekDay: nextDay.day() ? String(nextDay.day()) : '7',
      shifts: []
    });
  }
  nextWeekDeliveryTimes = nextWeekDeliveryTimes.map(item => {
    let shifts = customDeliveryTimes[item.date];
    if (!shifts) {
      shifts = deliveryTimes[item.weekDay];
    }
    if (item.date === nextWeekDeliveryTimes[0].date) {
      shifts = shifts.filter(
        shift => parseInt(shift.from.split(':')[0], 10) > today.format('HH')
      );
    }
    return { ...item, shifts };
  });
  return nextWeekDeliveryTimes.filter(time => time.shifts.length).slice(0, 3);
}

function deliveryTimeFormatter(deliveryTime) {
  const fromTime = moment.unix(deliveryTime.from_time);
  const date = englishNumberToPersianNumber(fromTime.jDate());
  const month = getMonthName(fromTime.jMonth());
  const weekDay = getCalendarWeekDay(fromTime.day());
  const toTime = moment.unix(deliveryTime.to_time).format('HH:mm');
  return `${weekDay} ${date} ${month} بازه ${englishNumberToPersianNumber(
    fromTime.format('HH:mm')
  )} تا ${englishNumberToPersianNumber(toTime)}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

function formatWeekDays(weekDays) {
  const sunday = weekDays.pop();
  const saturday = weekDays.pop();
  return [saturday, sunday, ...weekDays];
}

export {
  getCountDown,
  noOp,
  useCustomForm,
  useForm,
  handleKeyDown,
  getQueryParams,
  businessSerializer,
  matomoEventCall,
  getFileExtention,
  getFileExtensionType,
  generateTimeRange,
  isNumber,
  isPhoneNumber,
  getWeekDay,
  devideArraysIntoGroups,
  englishNumberToPersianNumber,
  removeSecondsFromDateString,
  correctWorkHoursFormat,
  addCommaToPrice,
  calculateDiscountPercent,
  priceFormatter,
  ellipseText,
  getSubDomain,
  callPhoneNumber,
  googleMapsNavigate,
  wazeNavigate,
  persianToEnglishNumber,
  useOutsideAlerter,
  validateDomain,
  isBusinessOpenNow,
  reverseLabelToWorkingDays,
  getCalendarWeekDay,
  getAvailableDeliveryTimes,
  deliveryTimeFormatter,
  getMonthName,
  hexToRgb,
  formatWeekDays
};
