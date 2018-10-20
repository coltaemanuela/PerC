import { Layout, Top, Middle, Bottom } from './Layout';
import { ButtonGroup, Button, Money, FormRow, IconSvg } from './Atoms';
import { Toggle, Card, FormElement, Cleave, CharityListItem } from './Molecules';
import { GiftSnippet, TopUpAmount, CreditCard, Favourites, CharitySearch, Footer, Bubbles, TopBar, Modal } from './Organisms';

// Ignore this file... It simply exposes the React components to the demos.  It has no relevance for production builds.
window.Component = {
  Card: Card,
  Button: Button,
  Bubbles: Bubbles,
  Layout: Layout,
  Top: Top,
  Middle: Middle,
  Bottom: Bottom,
  Money: Money,
  TopBar: TopBar,
  Modal: Modal,
  ButtonGroup: ButtonGroup,
  Toggle: Toggle,
  GiftSnippet: GiftSnippet,
  TopUpAmount: TopUpAmount,
  CreditCard: CreditCard,
  Favourites: Favourites,
  CharitySearch: CharitySearch,
  FormElement: FormElement,
  FormRow: FormRow,
  Cleave: Cleave,
  Footer: Footer,
  CharityListItem: CharityListItem,
  IconSvg: IconSvg
}
