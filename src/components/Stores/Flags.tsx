import React from 'react';

// Импортируем все флаги через ES-модули
import UsFlag from 'country-flag-icons/react/3x2/US';
import EuFlag from 'country-flag-icons/react/3x2/EU';
import RuFlag from 'country-flag-icons/react/3x2/RU';
import AeFlag from 'country-flag-icons/react/3x2/AE';
import AuFlag from 'country-flag-icons/react/3x2/AU';
import AzFlag from 'country-flag-icons/react/3x2/AZ';
import GbFlag from 'country-flag-icons/react/3x2/GB';
import AmFlag from 'country-flag-icons/react/3x2/AM';
import ByFlag from 'country-flag-icons/react/3x2/BY';
import BgFlag from 'country-flag-icons/react/3x2/BG';
import BrFlag from 'country-flag-icons/react/3x2/BR';
import HuFlag from 'country-flag-icons/react/3x2/HU';
import VnFlag from 'country-flag-icons/react/3x2/VN';
import HkFlag from 'country-flag-icons/react/3x2/HK';
import GeFlag from 'country-flag-icons/react/3x2/GE';
import DkFlag from 'country-flag-icons/react/3x2/DK';
import EgFlag from 'country-flag-icons/react/3x2/EG';
import InFlag from 'country-flag-icons/react/3x2/IN';
import IdFlag from 'country-flag-icons/react/3x2/ID';
import KzFlag from 'country-flag-icons/react/3x2/KZ';
import CaFlag from 'country-flag-icons/react/3x2/CA';
import QaFlag from 'country-flag-icons/react/3x2/QA';
import KgFlag from 'country-flag-icons/react/3x2/KG';
import CnFlag from 'country-flag-icons/react/3x2/CN';
import MdFlag from 'country-flag-icons/react/3x2/MD';
import NzFlag from 'country-flag-icons/react/3x2/NZ';
import NoFlag from 'country-flag-icons/react/3x2/NO';
import PlFlag from 'country-flag-icons/react/3x2/PL';
import RoFlag from 'country-flag-icons/react/3x2/RO';
import SgFlag from 'country-flag-icons/react/3x2/SG';
import TjFlag from 'country-flag-icons/react/3x2/TJ';
import ThFlag from 'country-flag-icons/react/3x2/TH';
import TrFlag from 'country-flag-icons/react/3x2/TR';
import TmFlag from 'country-flag-icons/react/3x2/TM';
import UzFlag from 'country-flag-icons/react/3x2/UZ';
import UaFlag from 'country-flag-icons/react/3x2/UA';
import CzFlag from 'country-flag-icons/react/3x2/CZ';
import SeFlag from 'country-flag-icons/react/3x2/SE';
import ChFlag from 'country-flag-icons/react/3x2/CH';
import RsFlag from 'country-flag-icons/react/3x2/RS';
import ZaFlag from 'country-flag-icons/react/3x2/ZA';
import KrFlag from 'country-flag-icons/react/3x2/KR';
import JpFlag from 'country-flag-icons/react/3x2/JP';

// Тип для флагов как обычных React-компонентов
type FlagComponentType = React.FC<{
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  [key: string]: any; // Дополнительные пропсы
}>;

const DefaultFlag: FlagComponentType = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 18">
    <rect width="24" height="18" fill="#ddd" />
  </svg>
);

const FLAGS: Record<string, FlagComponentType> = {
  USD: UsFlag,
  EUR: EuFlag,
  RUB: RuFlag,
  AED: AeFlag,
  AUD: AuFlag,
  AZN: AzFlag,
  GBP: GbFlag,
  AMD: AmFlag,
  BYN: ByFlag,
  BGN: BgFlag,
  BRL: BrFlag,
  HUF: HuFlag,
  VND: VnFlag,
  HKD: HkFlag,
  GEL: GeFlag,
  DKK: DkFlag,
  EGP: EgFlag,
  INR: InFlag,
  IDR: IdFlag,
  KZT: KzFlag,
  CAD: CaFlag,
  QAR: QaFlag,
  KGS: KgFlag,
  CNY: CnFlag,
  MDL: MdFlag,
  NZD: NzFlag,
  NOK: NoFlag,
  PLN: PlFlag,
  RON: RoFlag,
  XDR: EuFlag,
  SGD: SgFlag,
  TJS: TjFlag,
  THB: ThFlag,
  TRY: TrFlag,
  TMT: TmFlag,
  UZS: UzFlag,
  UAH: UaFlag,
  CZK: CzFlag,
  SEK: SeFlag,
  CHF: ChFlag,
  RSD: RsFlag,
  ZAR: ZaFlag,
  KRW: KrFlag,
  JPY: JpFlag
};

export const getCurrencyFlag = (currencyCode: string): React.ReactElement => {
  const FlagComponent = FLAGS[currencyCode] || DefaultFlag;
  return <FlagComponent 
    className="currency-flag" 
    style={{ width: '24px', height: '18px' }} 
  />;
};