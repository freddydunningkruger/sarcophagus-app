import { createContext, useContext } from 'react'
import { useArcheologists } from './useArchaeologists'
import { useSarcophagusContract, useSarcophagusTokenContract } from './contracts'
import { useSarcophagus } from './useSarcophagus'
import { useSarcoAllowance } from './myBalances'

let context

const createDataRoot = () => {
  context = createContext()


  context.displayName = 'Data Provider'
  const Provider = context.Provider

  
  return ({ children }) => {
    const sarcophagusContract = useSarcophagusContract()
    const sarcophagusTokenContract = useSarcophagusTokenContract()

    const { archaeologists } = useArcheologists(sarcophagusContract)
    const { createSarcophagus, updateSarcophagus } = useSarcophagus(sarcophagusTokenContract, sarcophagusContract)
    const { sarcoAllowance } = useSarcoAllowance(sarcophagusContract, sarcophagusTokenContract)
    
    const dataContext = {
      sarcophagusContract,
      sarcophagusTokenContract,
      archaeologists,
      sarcoAllowance,
      createSarcophagus,
      updateSarcophagus
    }
    return <Provider value={dataContext}>{children}</Provider>
  }
}

const DataProvider = createDataRoot()

const useData = () => {
  return useContext(context)
}

export { DataProvider, useData }