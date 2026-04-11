/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react'
import useLocalStorage from 'use-local-storage'

export const LanguageContext = createContext(undefined)

const data = {
  en: {
    'save': 'Save',
    'wallet': 'Wallet',
    'connect': 'Connect',
    'select_type': 'Select type',
    'select_type_one_card': 'One-Card Spread',
    'select_type_three_card': 'Three-Card Spread',
    'select_type_celtic_cross_card': 'Celtic Cross Spread',
    'reverse_cards': 'Include Reversed Cards',
    'placeholder': 'When will I be happy?',
    'question': 'Question',
    'advice': 'Advice',
    'back': 'Back',
    'first_card': 'The first card',
    'second_card': 'The second card',
    'third_card': 'The third card',
    'past': 'Past',
    'thoughts': 'Thoughts',
    'situation': 'Situation',
    'present': 'Present',
    'feelings': 'Feelings',
    'obstacle': 'Obstacle',
    'future': 'Future',
    'actions': 'Actions',
    'you': 'You',
    'partner': 'Partner',
    'relationships': 'Relationships',
    'not_found': 'Not found',
    'load': 'Loading ...',
    'get_prediction': 'Get prediction',
    'answer': 'Answer',
    'card1': 'Current Situation',
    'card2': 'Obstacle',
    'card3': 'Foundation',
    'card4': 'Past',
    'card5': 'Conscious Mind',
    'card6': 'Near Future',
    'card7': 'You',
    'card8': 'Environment',
    'card9': 'Hopes and Fears',
    'card10': 'Outcome',
    'not_prediction': 'No cards drawn yet',
    'yes': 'Yes',
    'no': 'No',
    'require_auth': 'Require connect wallet',
    'сlear': 'Clear'
  },
  ru: {
    'save': 'Сохранить',
    'wallet': 'Кошелек',
    'connect': 'Подключить',
    'select_type': 'Тип расклада',
    'select_type_one_card': 'Одна карта',
    'select_type_three_card': 'Три карты',
    'select_type_celtic_cross_card': 'Кельский крест',
    'reverse_cards': 'Перевернутые карты',
    'placeholder': 'Какое мое будущее?',
    'question': 'Вопрос',
    'advice': 'Совет',
    'back': 'Назад',
    'first_card': 'Первая карта',
    'second_card': 'Вторая карта',
    'third_card': 'Третья карта',
    'past': 'Прошлое',
    'thoughts': 'Мысли',
    'situation': 'Ситуация',
    'present': 'Настоящее',
    'feelings': 'Чувства',
    'obstacle': 'Препятствие',
    'future': 'Будущее',
    'actions': 'Действия',
    'you': 'Ты',
    'partner': 'Партнер',
    'relationships': 'Отношения',
    'not_found': 'Ничего нет',
    'load': 'Загрузка ...',
    'get_prediction': 'Получить предсказание',
    'answer': 'Ответ',
    'card1': 'Суть ситуации',
    'card2': 'Препятствие',
    'card3': 'Основание',
    'card4': 'Прошлое',
    'card5': 'Сознание',
    'card6': 'Ближайшее будущее',
    'card7': 'Вы',
    'card8': 'Окружение',
    'card9': 'Надежды и страхи',
    'card10': 'Итог',
    'not_prediction': 'Нет расклада',
    'yes': 'Да',
    'no': 'Нет',
    'require_auth': 'Требуется подключить кошелек',
    'сlear': 'Очистить'
  }
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useLocalStorage('language', 'en')

  return (
    <LanguageContext.Provider 
      value={{ 
        data: data[lang], 
        lang,
        setLang
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
