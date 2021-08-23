// ** React Imports
import { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data
import messagesEs from '@assets/data/locales/es.json'
// import messagesEn from '@assets/data/locales/en.json'
// import messagesDe from '@assets/data/locales/de.json'
// import messagesFr from '@assets/data/locales/fr.json'
// import messagesPt from '@assets/data/locales/pt.json'

// ** User Language Data
import userMessagesEs from '@src/assets/data/locales/es.json'
// import userMessagesEn from '@src/assets/data/locales/en.json'
// import userMessagesDe from '@src/assets/data/locales/de.json'
// import userMessagesFr from '@src/assets/data/locales/fr.json'
// import userMessagesPt from '@src/assets/data/locales/pt.json'

// ** Menu msg obj
const menuMessages = {
  es: { ...messagesEs, ...userMessagesEs }
  // en: { ...messagesEn, ...userMessagesEn },
  // de: { ...messagesDe, ...userMessagesDe },
  // fr: { ...messagesFr, ...userMessagesFr },
  // pt: { ...messagesPt, ...userMessagesPt }
}

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState('es')
  const [messages, setMessages] = useState(menuMessages['es'])

  // ** Switches Language
  const switchLanguage = lang => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale='es'>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
