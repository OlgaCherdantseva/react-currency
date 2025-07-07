import React from 'react'

const e = React.createElement

export default function IntroSection() {
  return e('section', null, [
    e('h1', { className: 'centered', key: 1 }, 'Получи профессию frontend-разработчика на React'),
    e(
      'h3',
      { className: 'centered', style: { color: '#666' }, key: 2 },
      'Создай лучший проект на своей новой работе после прохождения обучения'
    ),
  ])
}
