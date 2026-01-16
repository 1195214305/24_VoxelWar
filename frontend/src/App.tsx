import { GameScene } from './components/GameScene'
import { MainMenu } from './components/MainMenu'
import { GameHUD } from './components/GameHUD'
import { SettingsPanel } from './components/SettingsPanel'
import { BlockSelector } from './components/BlockSelector'
import { WeaponSelector } from './components/WeaponSelector'
import { AIAssistant } from './components/AIAssistant'
import { MobileControls } from './components/MobileControls'

export default function App() {
  return (
    <div className="w-full h-full">
      <GameScene />
      <MainMenu />
      <GameHUD />
      <SettingsPanel />
      <BlockSelector />
      <WeaponSelector />
      <AIAssistant />
      <MobileControls />
    </div>
  )
}
