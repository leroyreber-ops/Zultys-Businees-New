import { useState, useEffect, lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const Solutions = lazy(() => import('./pages/Solutions').then(m => ({ default: m.Solutions })));
const ZultysBusinessPhoneSystems = lazy(() => import('./pages/ZultysBusinessPhoneSystems').then(m => ({ default: m.ZultysBusinessPhoneSystems })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const MXSeries = lazy(() => import('./pages/MXSeries').then(m => ({ default: m.MXSeries })));
const MXSE = lazy(() => import('./pages/MXSE').then(m => ({ default: m.MXSE })));
const ZIP49G = lazy(() => import('./pages/ZIP49G').then(m => ({ default: m.ZIP49G })));
const ZIP47G = lazy(() => import('./pages/ZIP47G').then(m => ({ default: m.ZIP47G })));
const ZIP45G = lazy(() => import('./pages/ZIP45G').then(m => ({ default: m.ZIP45G })));
const ZIP43G = lazy(() => import('./pages/ZIP43G').then(m => ({ default: m.ZIP43G })));
const ZAC = lazy(() => import('./pages/ZAC').then(m => ({ default: m.ZAC })));
const MXmobile = lazy(() => import('./pages/MXmobile').then(m => ({ default: m.MXmobile })));
const MXconference = lazy(() => import('./pages/MXconference').then(m => ({ default: m.MXconference })));
const Healthcare = lazy(() => import('./pages/Healthcare').then(m => ({ default: m.Healthcare })));
const ProfessionalServices = lazy(() => import('./pages/ProfessionalServices').then(m => ({ default: m.ProfessionalServices })));
const RealEstate = lazy(() => import('./pages/RealEstate').then(m => ({ default: m.RealEstate })));
const Education = lazy(() => import('./pages/Education').then(m => ({ default: m.Education })));
const RetailAutomotive = lazy(() => import('./pages/RetailAutomotive').then(m => ({ default: m.RetailAutomotive })));
const Enterprise = lazy(() => import('./pages/Enterprise').then(m => ({ default: m.Enterprise })));
const MultiLocation = lazy(() => import('./pages/MultiLocation').then(m => ({ default: m.MultiLocation })));
const CloudServices = lazy(() => import('./pages/CloudServices').then(m => ({ default: m.CloudServices })));
const OnPremise = lazy(() => import('./pages/OnPremise').then(m => ({ default: m.OnPremise })));
const Hybrid = lazy(() => import('./pages/Hybrid').then(m => ({ default: m.Hybrid })));
const ContactCenter = lazy(() => import('./pages/ContactCenter').then(m => ({ default: m.ContactCenter })));
const Support = lazy(() => import('./pages/Support').then(m => ({ default: m.Support })));
const Installation = lazy(() => import('./pages/Installation').then(m => ({ default: m.Installation })));
const Training = lazy(() => import('./pages/Training').then(m => ({ default: m.Training })));
const Addison = lazy(() => import('./pages/Addison').then(m => ({ default: m.Addison })));
const Aledo = lazy(() => import('./pages/Aledo').then(m => ({ default: m.Aledo })));
const Springtown = lazy(() => import('./pages/Springtown').then(m => ({ default: m.Springtown })));
const Granbury = lazy(() => import('./pages/Granbury').then(m => ({ default: m.Granbury })));
const GlenRose = lazy(() => import('./pages/GlenRose').then(m => ({ default: m.GlenRose })));
const Godley = lazy(() => import('./pages/Godley').then(m => ({ default: m.Godley })));
const Grandview = lazy(() => import('./pages/Grandview').then(m => ({ default: m.Grandview })));
const Venus = lazy(() => import('./pages/Venus').then(m => ({ default: m.Venus })));
const Maypearl = lazy(() => import('./pages/Maypearl').then(m => ({ default: m.Maypearl })));
const Italy = lazy(() => import('./pages/Italy').then(m => ({ default: m.Italy })));
const Milford = lazy(() => import('./pages/Milford').then(m => ({ default: m.Milford })));
const Palmer = lazy(() => import('./pages/Palmer').then(m => ({ default: m.Palmer })));
const Sitemap = lazy(() => import('./pages/Sitemap').then(m => ({ default: m.Sitemap })));
const SmallBusiness = lazy(() => import('./pages/SmallBusiness').then(m => ({ default: m.SmallBusiness })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogBestChoice = lazy(() => import('./pages/BlogBestChoice').then(m => ({ default: m.BlogBestChoice })));
const BlogCloudVsOnPremise = lazy(() => import('./pages/BlogCloudVsOnPremise').then(m => ({ default: m.BlogCloudVsOnPremise })));
const BlogNetworkOptimization = lazy(() => import('./pages/BlogNetworkOptimization').then(m => ({ default: m.BlogNetworkOptimization })));
const ZultysVsCompetitors = lazy(() => import('./pages/ZultysVsCompetitors').then(m => ({ default: m.ZultysVsCompetitors })));
const ZultysVsRingCentral = lazy(() => import('./pages/ZultysVsRingCentral').then(m => ({ default: m.ZultysVsRingCentral })));
const ZultysVs8x8 = lazy(() => import('./pages/ZultysVs8x8').then(m => ({ default: m.ZultysVs8x8 })));
const ZultysVsTeams = lazy(() => import('./pages/ZultysVsTeams').then(m => ({ default: m.ZultysVsTeams })));
const ZultysVsVonage = lazy(() => import('./pages/ZultysVsVonage').then(m => ({ default: m.ZultysVsVonage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const HIPAACompliance = lazy(() => import('./pages/HIPAACompliance').then(m => ({ default: m.HIPAACompliance })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const FreeAudit = lazy(() => import('./pages/FreeAudit').then(m => ({ default: m.FreeAudit })));
const CaseStudies = lazy(() => import('./pages/CaseStudies').then(m => ({ default: m.CaseStudies })));
const VoIPGlossary = lazy(() => import('./pages/VoIPGlossary').then(m => ({ default: m.VoIPGlossary })));
const OurTeam = lazy(() => import('./pages/OurTeam').then(m => ({ default: m.OurTeam })));
const CertificationsAwards = lazy(() => import('./pages/CertificationsAwards').then(m => ({ default: m.CertificationsAwards })));
const UserGuides = lazy(() => import('./pages/UserGuides').then(m => ({ default: m.UserGuides })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const ZultysVsAvaya = lazy(() => import('./pages/ZultysVsAvaya').then(m => ({ default: m.ZultysVsAvaya })));
const ZultysVsCisco = lazy(() => import('./pages/ZultysVsCisco').then(m => ({ default: m.ZultysVsCisco })));
const ZultysVsMitel = lazy(() => import('./pages/ZultysVsMitel').then(m => ({ default: m.ZultysVsMitel })));
const ZultysMigrationGuide = lazy(() => import('./pages/ZultysMigrationGuide').then(m => ({ default: m.ZultysMigrationGuide })));
const ZultysCRMIntegration = lazy(() => import('./pages/ZultysCRMIntegration').then(m => ({ default: m.ZultysCRMIntegration })));
const ZultysVsZoom = lazy(() => import('./pages/ZultysVsZoom').then(m => ({ default: m.ZultysVsZoom })));
const ZultysVsGoTo = lazy(() => import('./pages/ZultysVsGoTo').then(m => ({ default: m.ZultysVsGoTo })));
const ZultysVsNextiva = lazy(() => import('./pages/ZultysVsNextiva').then(m => ({ default: m.ZultysVsNextiva })));
const RemoteWorkSolutions = lazy(() => import('./pages/RemoteWorkSolutions').then(m => ({ default: m.RemoteWorkSolutions })));
const VoIPSecurity = lazy(() => import('./pages/VoIPSecurity').then(m => ({ default: m.VoIPSecurity })));
const ZultysVsDialpad = lazy(() => import('./pages/ZultysVsDialpad').then(m => ({ default: m.ZultysVsDialpad })));
const ZultysVsIntermedia = lazy(() => import('./pages/ZultysVsIntermedia').then(m => ({ default: m.ZultysVsIntermedia })));
const LegalFirms = lazy(() => import('./pages/LegalFirms').then(m => ({ default: m.LegalFirms })));
const FinancialServices = lazy(() => import('./pages/FinancialServices').then(m => ({ default: m.FinancialServices })));
const ManufacturingLogistics = lazy(() => import('./pages/ManufacturingLogistics').then(m => ({ default: m.ManufacturingLogistics })));
const ZultysVsComcast = lazy(() => import('./pages/ZultysVsComcast').then(m => ({ default: m.ZultysVsComcast })));
const ZultysVsSpectrum = lazy(() => import('./pages/ZultysVsSpectrum').then(m => ({ default: m.ZultysVsSpectrum })));
const ZultysVsATT = lazy(() => import('./pages/ZultysVsATT').then(m => ({ default: m.ZultysVsATT })));
const HospitalitySolutions = lazy(() => import('./pages/HospitalitySolutions').then(m => ({ default: m.HospitalitySolutions })));
const NonProfitSolutions = lazy(() => import('./pages/NonProfitSolutions').then(m => ({ default: m.NonProfitSolutions })));
const ZultysVsOoma = lazy(() => import('./pages/ZultysVsOoma').then(m => ({ default: m.ZultysVsOoma })));
const EducationSolutions = lazy(() => import('./pages/EducationSolutions').then(m => ({ default: m.EducationSolutions })));
const RealEstateSolutions = lazy(() => import('./pages/RealEstateSolutions').then(m => ({ default: m.RealEstateSolutions })));
const RetailSolutions = lazy(() => import('./pages/RetailSolutions').then(m => ({ default: m.RetailSolutions })));
const Mesquite = lazy(() => import('./pages/Mesquite').then(m => ({ default: m.Mesquite })));
const Garland = lazy(() => import('./pages/Garland').then(m => ({ default: m.Garland })));
const McKinney = lazy(() => import('./pages/McKinney').then(m => ({ default: m.McKinney })));
const Denton = lazy(() => import('./pages/Denton').then(m => ({ default: m.Denton })));
const Lewisville = lazy(() => import('./pages/Lewisville').then(m => ({ default: m.Lewisville })));
const Allen = lazy(() => import('./pages/Allen').then(m => ({ default: m.Allen })));
const Mansfield = lazy(() => import('./pages/Mansfield').then(m => ({ default: m.Mansfield })));
const Rowlett = lazy(() => import('./pages/Rowlett').then(m => ({ default: m.Rowlett })));
const CedarHill = lazy(() => import('./pages/CedarHill').then(m => ({ default: m.CedarHill })));
const DeSoto = lazy(() => import('./pages/DeSoto').then(m => ({ default: m.DeSoto })));
const Coppell = lazy(() => import('./pages/Coppell').then(m => ({ default: m.Coppell })));
const Duncanville = lazy(() => import('./pages/Duncanville').then(m => ({ default: m.Duncanville })));
const Lancaster = lazy(() => import('./pages/Lancaster').then(m => ({ default: m.Lancaster })));
const TheColony = lazy(() => import('./pages/TheColony').then(m => ({ default: m.TheColony })));
const LittleElm = lazy(() => import('./pages/LittleElm').then(m => ({ default: m.LittleElm })));
const Wylie = lazy(() => import('./pages/Wylie').then(m => ({ default: m.Wylie })));
const Rockwall = lazy(() => import('./pages/Rockwall').then(m => ({ default: m.Rockwall })));
const Forney = lazy(() => import('./pages/Forney').then(m => ({ default: m.Forney })));
const Midlothian = lazy(() => import('./pages/Midlothian').then(m => ({ default: m.Midlothian })));
const Waxahachie = lazy(() => import('./pages/Waxahachie').then(m => ({ default: m.Waxahachie })));
const Ennis = lazy(() => import('./pages/Ennis').then(m => ({ default: m.Ennis })));
const Cleburne = lazy(() => import('./pages/Cleburne').then(m => ({ default: m.Cleburne })));
const Weatherford = lazy(() => import('./pages/Weatherford').then(m => ({ default: m.Weatherford })));
const Burleson = lazy(() => import('./pages/Burleson').then(m => ({ default: m.Burleson })));
const Terrell = lazy(() => import('./pages/Terrell').then(m => ({ default: m.Terrell })));
const Prosper = lazy(() => import('./pages/Prosper').then(m => ({ default: m.Prosper })));
const Murphy = lazy(() => import('./pages/Murphy').then(m => ({ default: m.Murphy })));
const Sachse = lazy(() => import('./pages/Sachse').then(m => ({ default: m.Sachse })));
const Seagoville = lazy(() => import('./pages/Seagoville').then(m => ({ default: m.Seagoville })));
const BalchSprings = lazy(() => import('./pages/BalchSprings').then(m => ({ default: m.BalchSprings })));
const Celina = lazy(() => import('./pages/Celina').then(m => ({ default: m.Celina })));
const Princeton = lazy(() => import('./pages/Princeton').then(m => ({ default: m.Princeton })));
const Anna = lazy(() => import('./pages/Anna').then(m => ({ default: m.Anna })));
const Melissa = lazy(() => import('./pages/Melissa').then(m => ({ default: m.Melissa })));
const RoyseCity = lazy(() => import('./pages/RoyseCity').then(m => ({ default: m.RoyseCity })));
const Fate = lazy(() => import('./pages/Fate').then(m => ({ default: m.Fate })));
const Heath = lazy(() => import('./pages/Heath').then(m => ({ default: m.Heath })));
const Sunnyvale = lazy(() => import('./pages/Sunnyvale').then(m => ({ default: m.Sunnyvale })));
const Crandall = lazy(() => import('./pages/Crandall').then(m => ({ default: m.Crandall })));
const Lavon = lazy(() => import('./pages/Lavon').then(m => ({ default: m.Lavon })));
const RedOak = lazy(() => import('./pages/RedOak').then(m => ({ default: m.RedOak })));
const Ovilla = lazy(() => import('./pages/Ovilla').then(m => ({ default: m.Ovilla })));
const GlennHeights = lazy(() => import('./pages/GlennHeights').then(m => ({ default: m.GlennHeights })));
const Hutchins = lazy(() => import('./pages/Hutchins').then(m => ({ default: m.Hutchins })));
const Wilmer = lazy(() => import('./pages/Wilmer').then(m => ({ default: m.Wilmer })));
const Kaufman = lazy(() => import('./pages/Kaufman').then(m => ({ default: m.Kaufman })));
const PilotPoint = lazy(() => import('./pages/PilotPoint').then(m => ({ default: m.PilotPoint })));
const Sanger = lazy(() => import('./pages/Sanger').then(m => ({ default: m.Sanger })));
const Aubrey = lazy(() => import('./pages/Aubrey').then(m => ({ default: m.Aubrey })));
const Alvarado = lazy(() => import('./pages/Alvarado').then(m => ({ default: m.Alvarado })));
const Decatur = lazy(() => import('./pages/Decatur').then(m => ({ default: m.Decatur })));
const Bridgeport = lazy(() => import('./pages/Bridgeport').then(m => ({ default: m.Bridgeport })));
const Justin = lazy(() => import('./pages/Justin').then(m => ({ default: m.Justin })));
const Krum = lazy(() => import('./pages/Krum').then(m => ({ default: m.Krum })));
const Ponder = lazy(() => import('./pages/Ponder').then(m => ({ default: m.Ponder })));
const TrophyClub = lazy(() => import('./pages/TrophyClub').then(m => ({ default: m.TrophyClub })));
const Roanoke = lazy(() => import('./pages/Roanoke').then(m => ({ default: m.Roanoke })));
const Argyle = lazy(() => import('./pages/Argyle').then(m => ({ default: m.Argyle })));
const Kennedale = lazy(() => import('./pages/Kennedale').then(m => ({ default: m.Kennedale })));
const ForestHill = lazy(() => import('./pages/ForestHill').then(m => ({ default: m.ForestHill })));
const BlueMound = lazy(() => import('./pages/BlueMound').then(m => ({ default: m.BlueMound })));
const Azle = lazy(() => import('./pages/Azle').then(m => ({ default: m.Azle })));
const Bartonville = lazy(() => import('./pages/Bartonville').then(m => ({ default: m.Bartonville })));
const Bowie = lazy(() => import('./pages/Bowie').then(m => ({ default: m.Bowie })));
const Boyd = lazy(() => import('./pages/Boyd').then(m => ({ default: m.Boyd })));
const Brock = lazy(() => import('./pages/Brock').then(m => ({ default: m.Brock })));
const Crowley = lazy(() => import('./pages/Crowley').then(m => ({ default: m.Crowley })));
const Haslet = lazy(() => import('./pages/Haslet').then(m => ({ default: m.Haslet })));
const Joshua = lazy(() => import('./pages/Joshua').then(m => ({ default: m.Joshua })));
const LakeWorth = lazy(() => import('./pages/LakeWorth').then(m => ({ default: m.LakeWorth })));
const Lakeside = lazy(() => import('./pages/Lakeside').then(m => ({ default: m.Lakeside })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const Z23GE = lazy(() => import('./pages/Z23GE').then(m => ({ default: m.Z23GE })));
const Z22G = lazy(() => import('./pages/Z22G').then(m => ({ default: m.Z22G })));
const Z21i = lazy(() => import('./pages/Z21i').then(m => ({ default: m.Z21i })));
const Gateways = lazy(() => import('./pages/Gateways').then(m => ({ default: m.Gateways })));
const DallasZultysPhones = lazy(() => import('./pages/DallasZultysPhones').then(m => ({ default: m.DallasZultysPhones })));
const Arlington = lazy(() => import('./pages/Arlington').then(m => ({ default: m.Arlington })));
const Plano = lazy(() => import('./pages/Plano').then(m => ({ default: m.Plano })));
const Irving = lazy(() => import('./pages/Irving').then(m => ({ default: m.Irving })));
const Frisco = lazy(() => import('./pages/Frisco').then(m => ({ default: m.Frisco })));
const GrandPrairie = lazy(() => import('./pages/GrandPrairie').then(m => ({ default: m.GrandPrairie })));
const Southlake = lazy(() => import('./pages/Southlake').then(m => ({ default: m.Southlake })));
const Grapevine = lazy(() => import('./pages/Grapevine').then(m => ({ default: m.Grapevine })));
const Carrollton = lazy(() => import('./pages/Carrollton').then(m => ({ default: m.Carrollton })));
const Richardson = lazy(() => import('./pages/Richardson').then(m => ({ default: m.Richardson })));
const Hurst = lazy(() => import('./pages/Hurst').then(m => ({ default: m.Hurst })));
const Bedford = lazy(() => import('./pages/Bedford').then(m => ({ default: m.Bedford })));
const Euless = lazy(() => import('./pages/Euless').then(m => ({ default: m.Euless })));
const NorthRichlandHills = lazy(() => import('./pages/NorthRichlandHills').then(m => ({ default: m.NorthRichlandHills })));
const FlowerMound = lazy(() => import('./pages/FlowerMound').then(m => ({ default: m.FlowerMound })));
const Colleyville = lazy(() => import('./pages/Colleyville').then(m => ({ default: m.Colleyville })));
const Keller = lazy(() => import('./pages/Keller').then(m => ({ default: m.Keller })));
const Saginaw = lazy(() => import('./pages/Saginaw').then(m => ({ default: m.Saginaw })));
const HaltomCity = lazy(() => import('./pages/HaltomCity').then(m => ({ default: m.HaltomCity })));
const Watauga = lazy(() => import('./pages/Watauga').then(m => ({ default: m.Watauga })));
const Benbrook = lazy(() => import('./pages/Benbrook').then(m => ({ default: m.Benbrook })));
const WestworthVillage = lazy(() => import('./pages/WestworthVillage').then(m => ({ default: m.WestworthVillage })));
const WhiteSettlement = lazy(() => import('./pages/WhiteSettlement').then(m => ({ default: m.WhiteSettlement })));
const RiverOaks = lazy(() => import('./pages/RiverOaks').then(m => ({ default: m.RiverOaks })));
const HudsonOaks = lazy(() => import('./pages/HudsonOaks').then(m => ({ default: m.HudsonOaks })));
const WillowPark = lazy(() => import('./pages/WillowPark').then(m => ({ default: m.WillowPark })));
const Everman = lazy(() => import('./pages/Everman').then(m => ({ default: m.Everman })));
const Pantego = lazy(() => import('./pages/Pantego').then(m => ({ default: m.Pantego })));
const DalworthingtonGardens = lazy(() => import('./pages/DalworthingtonGardens').then(m => ({ default: m.DalworthingtonGardens })));
const WestoverHills = lazy(() => import('./pages/WestoverHills').then(m => ({ default: m.WestoverHills })));
const EdgecliffVillage = lazy(() => import('./pages/EdgecliffVillage').then(m => ({ default: m.EdgecliffVillage })));
const RichlandHills = lazy(() => import('./pages/RichlandHills').then(m => ({ default: m.RichlandHills })));
const SansomPark = lazy(() => import('./pages/SansomPark').then(m => ({ default: m.SansomPark })));
const Reno = lazy(() => import('./pages/Reno').then(m => ({ default: m.Reno })));
const VanAlstyne = lazy(() => import('./pages/VanAlstyne').then(m => ({ default: m.VanAlstyne })));
const Leonard = lazy(() => import('./pages/Leonard').then(m => ({ default: m.Leonard })));
const Farmersville = lazy(() => import('./pages/Farmersville').then(m => ({ default: m.Farmersville })));
const Howe = lazy(() => import('./pages/Howe').then(m => ({ default: m.Howe })));
const Whitewright = lazy(() => import('./pages/Whitewright').then(m => ({ default: m.Whitewright })));
const Gunter = lazy(() => import('./pages/Gunter').then(m => ({ default: m.Gunter })));
const Collinsville = lazy(() => import('./pages/Collinsville').then(m => ({ default: m.Collinsville })));
const Tioga = lazy(() => import('./pages/Tioga').then(m => ({ default: m.Tioga })));
const TomBean = lazy(() => import('./pages/TomBean').then(m => ({ default: m.TomBean })));
const Trenton = lazy(() => import('./pages/Trenton').then(m => ({ default: m.Trenton })));
const Savoy = lazy(() => import('./pages/Savoy').then(m => ({ default: m.Savoy })));
const Bells = lazy(() => import('./pages/Bells').then(m => ({ default: m.Bells })));
const BlueRidge = lazy(() => import('./pages/BlueRidge').then(m => ({ default: m.BlueRidge })));
const Ector = lazy(() => import('./pages/Ector').then(m => ({ default: m.Ector })));
const Ravenna = lazy(() => import('./pages/Ravenna').then(m => ({ default: m.Ravenna })));
const Bonham = lazy(() => import('./pages/Bonham').then(m => ({ default: m.Bonham })));
const HoneyGrove = lazy(() => import('./pages/HoneyGrove').then(m => ({ default: m.HoneyGrove })));
const Ladonia = lazy(() => import('./pages/Ladonia').then(m => ({ default: m.Ladonia })));
const Windom = lazy(() => import('./pages/Windom').then(m => ({ default: m.Windom })));
const DoddCity = lazy(() => import('./pages/DoddCity').then(m => ({ default: m.DoddCity })));
const Merit = lazy(() => import('./pages/Merit').then(m => ({ default: m.Merit })));
const Celeste = lazy(() => import('./pages/Celeste').then(m => ({ default: m.Celeste })));
const WolfeCity = lazy(() => import('./pages/WolfeCity').then(m => ({ default: m.WolfeCity })));
const CaddoMills = lazy(() => import('./pages/CaddoMills').then(m => ({ default: m.CaddoMills })));
const Nevada = lazy(() => import('./pages/Nevada').then(m => ({ default: m.Nevada })));
const Josephine = lazy(() => import('./pages/Josephine').then(m => ({ default: m.Josephine })));
const Bailey = lazy(() => import('./pages/Bailey').then(m => ({ default: m.Bailey })));
const Randolph = lazy(() => import('./pages/Randolph').then(m => ({ default: m.Randolph })));
const Telephone = lazy(() => import('./pages/Telephone').then(m => ({ default: m.Telephone })));
const Ivanhoe = lazy(() => import('./pages/Ivanhoe').then(m => ({ default: m.Ivanhoe })));
const Gober = lazy(() => import('./pages/Gober').then(m => ({ default: m.Gober })));
import { Toaster } from 'sonner';
import { QuoteProvider } from './context/QuoteContext';
import { QuotePopupWrapper } from './components/QuotePopupWrapper';
import { FloatingTextCTA } from './components/FloatingTextCTA';
import { LocalBusinessSchema } from './components/LocalBusinessSchema';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { generateEliteMetadata } from './utils/seoHelpers';

// Advanced Canonical Normalization Lookup
const canonicalMap: Record<string, string> = {
  '/': '/',
  '/index.html': '/',
  '/mesquite': '/mesquite-zultys-phone-systems',
  '/garland': '/garland-business-voip',
  '/mckinney': '/mckinney-zultys-dealer',
  '/denton': '/denton-business-phone-systems',
  '/lewisville': '/lewisville-voip-solutions',
  '/allen': '/allen-tx-zultys-voip',
  '/mansfield': '/mansfield-tx-zultys-phone-systems',
  '/rowlett': '/rowlett-tx-zultys-dealer',
  '/cedar-hill': '/cedar-hill-tx-zultys-voip',
  '/desoto': '/desoto-tx-zultys-phone-systems',
  '/coppell': '/coppell-tx-zultys-phone-systems',
  '/duncanville': '/duncanville-tx-zultys-voip',
  '/lancaster': '/lancaster-tx-zultys-dealer',
  '/the-colony': '/the-colony-tx-zultys-voip',
  '/little-elm': '/little-elm-tx-zultys-phone-systems',
  '/wylie': '/wylie-tx-zultys-phone-systems',
  '/rockwall': '/rockwall-tx-zultys-phone-systems',
  '/forney': '/forney-tx-zultys-phone-systems',
  '/midlothian': '/midlothian-tx-zultys-phone-systems',
  '/waxahachie': '/waxahachie-tx-zultys-phone-systems',
  '/ennis': '/ennis-tx-zultys-phone-systems',
  '/cleburne': '/cleburne-tx-zultys-phone-systems',
  '/weatherford': '/weatherford-tx-zultys-phone-systems',
  '/burleson': '/burleson-tx-zultys-phone-systems',
  '/terrell': '/terrell-tx-zultys-phone-systems',
  '/prosper': '/prosper-tx-zultys-phone-systems',
  '/murphy': '/murphy-tx-zultys-voip',
  '/sachse': '/sachse-tx-zultys-dealer',
  '/seagoville': '/seagoville-tx-zultys-phone-systems',
  '/balch-springs': '/balch-springs-tx-zultys-voip',
  '/celina': '/celina-tx-zultys-phone-systems',
  '/princeton': '/princeton-tx-zultys-phone-systems',
  '/anna': '/anna-tx-zultys-phone-systems',
  '/melissa': '/melissa-tx-zultys-phone-systems',
  '/royse-city': '/royse-city-tx-zultys-phone-systems',
  '/fate': '/fate-tx-zultys-phone-systems',
  '/heath': '/heath-tx-zultys-phone-systems',
  '/sunnyvale': '/sunnyvale-tx-zultys-phone-systems',
  '/crandall': '/crandall-tx-zultys-phone-systems',
  '/lavon': '/lavon-tx-zultys-phone-systems',
  '/red-oak': '/red-oak-tx-zultys-phone-systems',
  '/ovilla': '/ovilla-tx-zultys-phone-systems',
  '/glenn-heights': '/glenn-heights-tx-zultys-phone-systems',
  '/hutchins': '/hutchins-tx-zultys-phone-systems',
  '/wilmer': '/wilmer-tx-zultys-phone-systems',
  '/kaufman': '/kaufman-tx-zultys-phone-systems',
  '/pilot-point': '/pilot-point-tx-zultys-phone-systems',
  '/sanger': '/sanger-tx-zultys-phone-systems',
  '/aubrey': '/aubrey-tx-zultys-phone-systems',
  '/alvarado': '/alvarado-tx-zultys-phone-systems',
  '/decatur': '/decatur-tx-zultys-phone-systems',
  '/bridgeport': '/bridgeport-tx-zultys-phone-systems',
  '/justin': '/justin-tx-zultys-phone-systems',
  '/krum': '/krum-tx-zultys-phone-systems',
  '/ponder': '/ponder-tx-zultys-phone-systems',
  '/trophy-club': '/trophy-club-tx-zultys-phone-systems',
  '/roanoke': '/roanoke-tx-zultys-phone-systems',
  '/argyle': '/argyle-tx-zultys-phone-systems',
  '/kennedale': '/kennedale-tx-zultys-phone-systems',
  '/forest-hill': '/forest-hill-tx-zultys-phone-systems',
  '/azle': '/azle-tx-zultys-phone-systems',
  '/bartonville': '/bartonville-tx-zultys-phone-systems',
  '/bowie': '/bowie-tx-zultys-phone-systems',
  '/boyd': '/boyd-tx-zultys-phone-systems',
  '/brock': '/brock-tx-zultys-phone-systems',
  '/crowley': '/crowley-tx-zultys-phone-systems',
  '/haslet': '/haslet-tx-zultys-phone-systems',
  '/joshua': '/joshua-tx-zultys-phone-systems',
  '/lake-worth': '/lake-worth-tx-zultys-phone-systems',
  '/lakeside': '/lakeside-tx-zultys-phone-systems',
  '/arlington': '/arlington-ip-pbx',
  '/plano': '/plano-zultys-dealer',
  '/irving': '/irving-business-phone-systems',
  '/frisco': '/frisco-voip-solutions',
  '/grand-prairie': '/grand-prairie-zultys',
  '/southlake': '/southlake-ip-phones',
  '/grapevine': '/grapevine-business-voip',
  '/carrollton': '/carrollton-zultys',
  '/richardson': '/richardson-phone-systems',
  '/hurst': '/hurst-ip-pbx',
  '/bedford': '/bedford-zultys-solutions',
  '/euless': '/euless-business-phones',
  '/north-richland-hills': '/north-richland-hills-zultys',
  '/flower-mound': '/flower-mound-business-phones',
  '/colleyville': '/colleyville-voip',
  '/keller': '/keller-zultys-dealer',
  '/saginaw': '/saginaw-business-communications',
  '/haltom-city': '/haltom-city-zultys',
  '/springtown': '/springtown-tx-zultys-phone-systems',
  '/granbury': '/granbury-tx-zultys-phone-systems',
  '/glen-rose': '/glen-rose-tx-zultys-phone-systems',
  '/godley': '/godley-tx-zultys-phone-systems',
  '/grandview': '/grandview-tx-zultys-phone-systems',
  '/venus': '/venus-tx-zultys-phone-systems',
  '/maypearl': '/maypearl-tx-zultys-phone-systems',
  '/italy': '/italy-tx-zultys-phone-systems',
  '/milford': '/milford-tx-zultys-phone-systems',
  '/palmer': '/palmer-tx-zultys-phone-systems',
  '/watauga': '/watauga-voip-solutions',
  '/benbrook': '/benbrook-phone-systems',
  '/westworth-village': '/westworth-village-zultys',
  '/white-settlement': '/white-settlement-business-phones',
  '/river-oaks': '/river-oaks-zultys',
  '/hudson-oaks': '/hudson-oaks-tx-zultys-phone-systems',
  '/willow-park': '/willow-park-tx-zultys-phone-systems',
  '/everman': '/everman-tx-zultys-phone-systems',
  '/pantego': '/pantego-tx-zultys-phone-systems',
  '/dalworthington-gardens': '/dalworthington-gardens-tx-zultys-phone-systems',
  '/westover-hills': '/westover-hills-tx-zultys-phone-systems',
  '/edgecliff-village': '/edgecliff-village-tx-zultys-phone-systems',
  '/richland-hills': '/richland-hills-tx-zultys-phone-systems',
  '/sansom-park': '/sansom-park-tx-zultys-phone-systems',
  '/reno': '/reno-tx-zultys-phone-systems',
  '/van-alstyne': '/van-alstyne-tx-zultys-phone-systems',
  '/leonard': '/leonard-tx-zultys-phone-systems',
  '/farmersville': '/farmersville-tx-zultys-phone-systems',
  '/howe': '/howe-tx-zultys-phone-systems',
  '/whitewright': '/whitewright-tx-zultys-phone-systems',
  '/gunter': '/gunter-tx-zultys-phone-systems',
  '/collinsville': '/collinsville-tx-zultys-phone-systems',
  '/tioga': '/tioga-tx-zultys-phone-systems',
  '/tom-bean': '/tom-bean-tx-zultys-phone-systems',
  '/trenton': '/trenton-tx-zultys-phone-systems',
  '/savoy': '/savoy-tx-zultys-phone-systems',
  '/bells': '/bells-tx-zultys-phone-systems',
  '/blue-ridge': '/blue-ridge-tx-zultys-phone-systems',
  '/ector': '/ector-tx-zultys-phone-systems',
  '/ravenna': '/ravenna-tx-zultys-phone-systems',
  '/bonham': '/bonham-tx-zultys-phone-systems',
  '/honey-grove': '/honey-grove-tx-zultys-phone-systems',
  '/ladonia': '/ladonia-tx-zultys-phone-systems',
  '/windom': '/windom-tx-zultys-phone-systems',
  '/dodd-city': '/dodd-city-tx-zultys-phone-systems',
  '/merit': '/merit-tx-zultys-phone-systems',
  '/celeste': '/celeste-tx-zultys-phone-systems',
  '/wolfe-city': '/wolfe-city-tx-zultys-phone-systems',
  '/caddo-mills': '/caddo-mills-tx-zultys-phone-systems',
  '/nevada': '/nevada-tx-zultys-phone-systems',
  '/josephine': '/josephine-tx-zultys-phone-systems',
  '/bailey': '/bailey-tx-zultys-phone-systems',
  '/randolph': '/randolph-tx-zultys-phone-systems',
  '/telephone': '/telephone-tx-zultys-phone-systems',
  '/ivanhoe': '/ivanhoe-tx-zultys-phone-systems',
  '/gober': '/gober-tx-zultys-phone-systems',
  '/dallas': '/dallas-zultys-phones',
  '/fort-worth': '/fort-worth-zultys-systems',
  '/addison': '/addison-tx-zultys-phone-systems',
  '/aledo': '/aledo-tx-zultys-phone-systems',
  '/blue-mound': '/blue-mound-tx-zultys-phone-systems',
  '/north-richland-hills-voip': '/north-richland-hills-zultys',
  '/colleyville-ip-phones': '/colleyville-voip',
  '/zultys-vs-competition': '/zultys-vs-competitors',
  '/sitemap': '/sitemap.html',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document level canonical, robots, and googlebot metadata on every path change
  useEffect(() => {
    const normalized = currentPath.toLowerCase().endsWith('/') && currentPath.length > 1 
      ? currentPath.toLowerCase().slice(0, -1) 
      : currentPath.toLowerCase();
    
    const canonicalPath = canonicalMap[normalized] || normalized;
    const canonicalUrl = `https://dallasfortworthzultys.com${canonicalPath}`;

    const updateCanonical = () => {
      // Ensure link rel="canonical" exists and has correct href
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    };

    // Apply immediately and also schedule to ensure we overwrite any child page's manual modifications
    updateCanonical();
    const timer = setTimeout(updateCanonical, 0);

    // Apply Elite dynamic SEO title, description and keywords
    const { title, description, keywords } = generateEliteMetadata(currentPath);

    const applyEliteSEO = () => {
      document.title = title;

      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);

      let keywMeta = document.querySelector('meta[name="keywords"]');
      if (!keywMeta) {
        keywMeta = document.createElement('meta');
        keywMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywMeta);
      }
      keywMeta.setAttribute('content', keywords);

      // Also set Open Graph and Twitter card tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDesc);
      }
      twitterDesc.setAttribute('content', description);
    };

    // Apply immediately & with a short deferment to override any local document modifications in page mount useEffects
    applyEliteSEO();
    const seoTimer = setTimeout(applyEliteSEO, 50);

    // Ensure robots instructions exist for maximum crawlability
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    let googlebotMeta = document.querySelector('meta[name="googlebot"]');
    if (!googlebotMeta) {
      googlebotMeta = document.createElement('meta');
      googlebotMeta.setAttribute('name', 'googlebot');
      document.head.appendChild(googlebotMeta);
    }
    googlebotMeta.setAttribute('content', 'index, follow');

    return () => {
      clearTimeout(timer);
      clearTimeout(seoTimer);
    };
  }, [currentPath]);

  // Simple routing logic
  const renderPage = () => {
    // Normalize path: remove trailing slash and convert to lowercase for robustness
    const normalizedPath = currentPath.toLowerCase().endsWith('/') && currentPath.length > 1 
      ? currentPath.toLowerCase().slice(0, -1) 
      : currentPath.toLowerCase();

    // Exact matches
    if (normalizedPath === '/' || normalizedPath === '/index.html') return <Home />;
    if (normalizedPath === '/products') return <Products />;
    if (normalizedPath === '/solutions') return <Solutions />;
    if (normalizedPath === '/about') return <About />;
    if (normalizedPath === '/contact') return <Contact />;
    if (normalizedPath === '/blog') return <Blog />;
    if (normalizedPath === '/blog/why-zultys-is-the-best-choice-for-dfw-small-businesses') return <BlogBestChoice />;
    if (normalizedPath === '/blog/on-premise-vs-cloud-which-zultys-deployment-is-right-for-you') return <BlogCloudVsOnPremise />;
    if (normalizedPath === '/blog/how-to-optimize-your-office-network-for-voip-performance') return <BlogNetworkOptimization />;
    
    if (normalizedPath === '/zultys-vs-competitors' || normalizedPath === '/zultys-vs-competition') return <ZultysVsCompetitors />;
    if (normalizedPath === '/zultys-vs-ringcentral') return <ZultysVsRingCentral />;
    if (normalizedPath === '/zultys-vs-8x8') return <ZultysVs8x8 />;
    if (normalizedPath === '/zultys-vs-microsoft-teams') return <ZultysVsTeams />;
    if (normalizedPath === '/zultys-vs-vonage') return <ZultysVsVonage />;
    if (normalizedPath === '/zultys-faq') return <FAQPage />;
    if (normalizedPath === '/hipaa-compliant-voip') return <HIPAACompliance />;
    if (normalizedPath === '/zultys-pricing') return <Pricing />;
    if (normalizedPath === '/free-voip-site-audit') return <FreeAudit />;
    if (normalizedPath === '/case-studies') return <CaseStudies />;
    if (normalizedPath === '/voip-glossary') return <VoIPGlossary />;
    if (normalizedPath === '/our-team') return <OurTeam />;
    if (normalizedPath === '/certifications-awards') return <CertificationsAwards />;
    if (normalizedPath === '/zultys-user-guides') return <UserGuides />;
    if (normalizedPath === '/privacy') return <PrivacyPolicy />;
    if (normalizedPath === '/terms') return <TermsOfService />;
    if (normalizedPath === '/zultys-vs-avaya') return <ZultysVsAvaya />;
    if (normalizedPath === '/zultys-vs-cisco-webex') return <ZultysVsCisco />;
    if (normalizedPath === '/zultys-vs-mitel') return <ZultysVsMitel />;
    if (normalizedPath === '/zultys-migration-guide-dfw') return <ZultysMigrationGuide />;
    if (normalizedPath === '/zultys-crm-integration-guide') return <ZultysCRMIntegration />;
    if (normalizedPath === '/zultys-vs-zoom-phone') return <ZultysVsZoom />;
    if (normalizedPath === '/zultys-vs-gotoconnect') return <ZultysVsGoTo />;
    if (normalizedPath === '/zultys-vs-nextiva') return <ZultysVsNextiva />;
    if (normalizedPath === '/remote-work-solutions') return <RemoteWorkSolutions />;
    if (normalizedPath === '/voip-security-encryption') return <VoIPSecurity />;
    if (normalizedPath === '/zultys-vs-dialpad') return <ZultysVsDialpad />;
    if (normalizedPath === '/zultys-vs-intermedia') return <ZultysVsIntermedia />;
    if (normalizedPath === '/zultys-for-legal-firms') return <LegalFirms />;
    if (normalizedPath === '/zultys-for-financial-services') return <FinancialServices />;
    if (normalizedPath === '/zultys-for-manufacturing-logistics') return <ManufacturingLogistics />;
    if (normalizedPath === '/zultys-vs-comcast-business') return <ZultysVsComcast />;
    if (normalizedPath === '/zultys-vs-spectrum-business') return <ZultysVsSpectrum />;
    if (normalizedPath === '/zultys-vs-att-business') return <ZultysVsATT />;
    if (normalizedPath === '/zultys-for-hospitality') return <HospitalitySolutions />;
    if (normalizedPath === '/zultys-for-non-profits') return <NonProfitSolutions />;
    if (normalizedPath === '/zultys-vs-ooma-office') return <ZultysVsOoma />;
    if (normalizedPath === '/zultys-for-education') return <EducationSolutions />;
    if (normalizedPath === '/zultys-for-real-estate') return <RealEstateSolutions />;
    if (normalizedPath === '/zultys-for-retail') return <RetailSolutions />;
    // City Pages with Aliases
    if (normalizedPath === '/mesquite-zultys-phone-systems' || normalizedPath === '/mesquite') return <Mesquite />;
    if (normalizedPath === '/garland-business-voip' || normalizedPath === '/garland') return <Garland />;
    if (normalizedPath === '/mckinney-zultys-dealer' || normalizedPath === '/mckinney') return <McKinney />;
    if (normalizedPath === '/denton-business-phone-systems' || normalizedPath === '/denton') return <Denton />;
    if (normalizedPath === '/lewisville-voip-solutions' || normalizedPath === '/lewisville') return <Lewisville />;
    if (normalizedPath === '/allen-tx-zultys-voip' || normalizedPath === '/allen') return <Allen />;
    if (normalizedPath === '/mansfield-tx-zultys-phone-systems' || normalizedPath === '/mansfield') return <Mansfield />;
    if (normalizedPath === '/rowlett-tx-zultys-dealer' || normalizedPath === '/rowlett') return <Rowlett />;
    if (normalizedPath === '/cedar-hill-tx-zultys-voip' || normalizedPath === '/cedar-hill') return <CedarHill />;
    if (normalizedPath === '/desoto-tx-zultys-phone-systems' || normalizedPath === '/desoto') return <DeSoto />;
    if (normalizedPath === '/coppell-tx-zultys-phone-systems' || normalizedPath === '/coppell') return <Coppell />;
    if (normalizedPath === '/duncanville-tx-zultys-voip' || normalizedPath === '/duncanville') return <Duncanville />;
    if (normalizedPath === '/lancaster-tx-zultys-dealer' || normalizedPath === '/lancaster') return <Lancaster />;
    if (normalizedPath === '/the-colony-tx-zultys-voip' || normalizedPath === '/the-colony') return <TheColony />;
    if (normalizedPath === '/little-elm-tx-zultys-phone-systems' || normalizedPath === '/little-elm') return <LittleElm />;
    if (normalizedPath === '/wylie-tx-zultys-phone-systems' || normalizedPath === '/wylie') return <Wylie />;
    if (normalizedPath === '/rockwall-tx-zultys-phone-systems' || normalizedPath === '/rockwall') return <Rockwall />;
    if (normalizedPath === '/forney-tx-zultys-phone-systems' || normalizedPath === '/forney') return <Forney />;
    if (normalizedPath === '/midlothian-tx-zultys-phone-systems' || normalizedPath === '/midlothian') return <Midlothian />;
    if (normalizedPath === '/waxahachie-tx-zultys-phone-systems' || normalizedPath === '/waxahachie') return <Waxahachie />;
    if (normalizedPath === '/ennis-tx-zultys-phone-systems' || normalizedPath === '/ennis') return <Ennis />;
    if (normalizedPath === '/cleburne-tx-zultys-phone-systems' || normalizedPath === '/cleburne') return <Cleburne />;
    if (normalizedPath === '/weatherford-tx-zultys-phone-systems' || normalizedPath === '/weatherford') return <Weatherford />;
    if (normalizedPath === '/burleson-tx-zultys-phone-systems' || normalizedPath === '/burleson') return <Burleson />;
    if (normalizedPath === '/terrell-tx-zultys-phone-systems' || normalizedPath === '/terrell') return <Terrell />;
    if (normalizedPath === '/prosper-tx-zultys-phone-systems' || normalizedPath === '/prosper') return <Prosper />;
    if (normalizedPath === '/murphy-tx-zultys-voip' || normalizedPath === '/murphy') return <Murphy />;
    if (normalizedPath === '/sachse-tx-zultys-dealer' || normalizedPath === '/sachse') return <Sachse />;
    if (normalizedPath === '/seagoville-tx-zultys-phone-systems' || normalizedPath === '/seagoville') return <Seagoville />;
    if (normalizedPath === '/balch-springs-tx-zultys-voip' || normalizedPath === '/balch-springs') return <BalchSprings />;
    if (normalizedPath === '/celina-tx-zultys-phone-systems' || normalizedPath === '/celina') return <Celina />;
    if (normalizedPath === '/princeton-tx-zultys-phone-systems' || normalizedPath === '/princeton') return <Princeton />;
    if (normalizedPath === '/anna-tx-zultys-phone-systems' || normalizedPath === '/anna') return <Anna />;
    if (normalizedPath === '/melissa-tx-zultys-phone-systems' || normalizedPath === '/melissa') return <Melissa />;
    if (normalizedPath === '/royse-city-tx-zultys-phone-systems' || normalizedPath === '/royse-city') return <RoyseCity />;
    if (normalizedPath === '/fate-tx-zultys-phone-systems' || normalizedPath === '/fate') return <Fate />;
    if (normalizedPath === '/heath-tx-zultys-phone-systems' || normalizedPath === '/heath') return <Heath />;
    if (normalizedPath === '/sunnyvale-tx-zultys-phone-systems' || normalizedPath === '/sunnyvale') return <Sunnyvale />;
    if (normalizedPath === '/crandall-tx-zultys-phone-systems' || normalizedPath === '/crandall') return <Crandall />;
    if (normalizedPath === '/lavon-tx-zultys-phone-systems' || normalizedPath === '/lavon') return <Lavon />;
    if (normalizedPath === '/red-oak-tx-zultys-phone-systems' || normalizedPath === '/red-oak') return <RedOak />;
    if (normalizedPath === '/ovilla-tx-zultys-phone-systems' || normalizedPath === '/ovilla') return <Ovilla />;
    if (normalizedPath === '/glenn-heights-tx-zultys-phone-systems' || normalizedPath === '/glenn-heights') return <GlennHeights />;
    if (normalizedPath === '/hutchins-tx-zultys-phone-systems' || normalizedPath === '/hutchins') return <Hutchins />;
    if (normalizedPath === '/wilmer-tx-zultys-phone-systems' || normalizedPath === '/wilmer') return <Wilmer />;
    if (normalizedPath === '/kaufman-tx-zultys-phone-systems' || normalizedPath === '/kaufman') return <Kaufman />;
    if (normalizedPath === '/pilot-point-tx-zultys-phone-systems' || normalizedPath === '/pilot-point') return <PilotPoint />;
    if (normalizedPath === '/sanger-tx-zultys-phone-systems' || normalizedPath === '/sanger') return <Sanger />;
    if (normalizedPath === '/aubrey-tx-zultys-phone-systems' || normalizedPath === '/aubrey') return <Aubrey />;
    if (normalizedPath === '/alvarado-tx-zultys-phone-systems' || normalizedPath === '/alvarado') return <Alvarado />;
    if (normalizedPath === '/decatur-tx-zultys-phone-systems' || normalizedPath === '/decatur') return <Decatur />;
    if (normalizedPath === '/bridgeport-tx-zultys-phone-systems' || normalizedPath === '/bridgeport') return <Bridgeport />;
    if (normalizedPath === '/justin-tx-zultys-phone-systems' || normalizedPath === '/justin') return <Justin />;
    if (normalizedPath === '/krum-tx-zultys-phone-systems' || normalizedPath === '/krum') return <Krum />;
    if (normalizedPath === '/ponder-tx-zultys-phone-systems' || normalizedPath === '/ponder') return <Ponder />;
    if (normalizedPath === '/trophy-club-tx-zultys-phone-systems' || normalizedPath === '/trophy-club') return <TrophyClub />;
    if (normalizedPath === '/roanoke-tx-zultys-phone-systems' || normalizedPath === '/roanoke') return <Roanoke />;
    if (normalizedPath === '/argyle-tx-zultys-phone-systems' || normalizedPath === '/argyle') return <Argyle />;
    if (normalizedPath === '/kennedale-tx-zultys-phone-systems' || normalizedPath === '/kennedale') return <Kennedale />;
    if (normalizedPath === '/forest-hill-tx-zultys-phone-systems' || normalizedPath === '/forest-hill') return <ForestHill />;
    if (normalizedPath === '/azle-tx-zultys-phone-systems' || normalizedPath === '/azle') return <Azle />;
    if (normalizedPath === '/bartonville-tx-zultys-phone-systems' || normalizedPath === '/bartonville') return <Bartonville />;
    if (normalizedPath === '/bowie-tx-zultys-phone-systems' || normalizedPath === '/bowie') return <Bowie />;
    if (normalizedPath === '/boyd-tx-zultys-phone-systems' || normalizedPath === '/boyd') return <Boyd />;
    if (normalizedPath === '/brock-tx-zultys-phone-systems' || normalizedPath === '/brock') return <Brock />;
    if (normalizedPath === '/crowley-tx-zultys-phone-systems' || normalizedPath === '/crowley') return <Crowley />;
    if (normalizedPath === '/haslet-tx-zultys-phone-systems' || normalizedPath === '/haslet') return <Haslet />;
    if (normalizedPath === '/joshua-tx-zultys-phone-systems' || normalizedPath === '/joshua') return <Joshua />;
    if (normalizedPath === '/lake-worth-tx-zultys-phone-systems' || normalizedPath === '/lake-worth') return <LakeWorth />;
    if (normalizedPath === '/lakeside-tx-zultys-phone-systems' || normalizedPath === '/lakeside') return <Lakeside />;
    
    if (normalizedPath === '/arlington-ip-pbx' || normalizedPath === '/arlington') return <Arlington />;
    if (normalizedPath === '/plano-zultys-dealer' || normalizedPath === '/plano') return <Plano />;
    if (normalizedPath === '/irving-business-phone-systems' || normalizedPath === '/irving') return <Irving />;
    if (normalizedPath === '/frisco-voip-solutions' || normalizedPath === '/frisco') return <Frisco />;
    if (normalizedPath === '/grand-prairie-zultys' || normalizedPath === '/grand-prairie') return <GrandPrairie />;
    if (normalizedPath === '/southlake-ip-phones' || normalizedPath === '/southlake') return <Southlake />;
    if (normalizedPath === '/grapevine-business-voip' || normalizedPath === '/grapevine') return <Grapevine />;
    if (normalizedPath === '/carrollton-zultys' || normalizedPath === '/carrollton') return <Carrollton />;
    if (normalizedPath === '/richardson-phone-systems' || normalizedPath === '/richardson') return <Richardson />;
    if (normalizedPath === '/hurst-ip-pbx' || normalizedPath === '/hurst') return <Hurst />;
    if (normalizedPath === '/bedford-zultys-solutions' || normalizedPath === '/bedford') return <Bedford />;
    if (normalizedPath === '/euless-business-phones' || normalizedPath === '/euless') return <Euless />;
    
    if (normalizedPath === '/north-richland-hills-zultys' || normalizedPath === '/north-richland-hills' || normalizedPath === '/north-richland-hills-voip') return <NorthRichlandHills />;
    if (normalizedPath === '/flower-mound-business-phones' || normalizedPath === '/flower-mound') return <FlowerMound />;
    if (normalizedPath === '/colleyville-voip' || normalizedPath === '/colleyville' || normalizedPath === '/colleyville-ip-phones') return <Colleyville />;
    if (normalizedPath === '/keller-zultys-dealer' || normalizedPath === '/keller') return <Keller />;
    if (normalizedPath === '/saginaw-business-communications' || normalizedPath === '/saginaw') return <Saginaw />;
    if (normalizedPath === '/haltom-city-zultys' || normalizedPath === '/haltom-city') return <HaltomCity />;
    if (normalizedPath === '/springtown-tx-zultys-phone-systems' || normalizedPath === '/springtown') return <Springtown />;
    if (normalizedPath === '/granbury-tx-zultys-phone-systems' || normalizedPath === '/granbury') return <Granbury />;
    if (normalizedPath === '/glen-rose-tx-zultys-phone-systems' || normalizedPath === '/glen-rose') return <GlenRose />;
    if (normalizedPath === '/godley-tx-zultys-phone-systems' || normalizedPath === '/godley') return <Godley />;
    if (normalizedPath === '/grandview-tx-zultys-phone-systems' || normalizedPath === '/grandview') return <Grandview />;
    if (normalizedPath === '/venus-tx-zultys-phone-systems' || normalizedPath === '/venus') return <Venus />;
    if (normalizedPath === '/maypearl-tx-zultys-phone-systems' || normalizedPath === '/maypearl') return <Maypearl />;
    if (normalizedPath === '/italy-tx-zultys-phone-systems' || normalizedPath === '/italy') return <Italy />;
    if (normalizedPath === '/milford-tx-zultys-phone-systems' || normalizedPath === '/milford') return <Milford />;
    if (normalizedPath === '/palmer-tx-zultys-phone-systems' || normalizedPath === '/palmer') return <Palmer />;
    if (normalizedPath === '/watauga-voip-solutions' || normalizedPath === '/watauga') return <Watauga />;
    if (normalizedPath === '/benbrook-phone-systems' || normalizedPath === '/benbrook') return <Benbrook />;
    if (normalizedPath === '/westworth-village-zultys' || normalizedPath === '/westworth-village') return <WestworthVillage />;
    if (normalizedPath === '/white-settlement-business-phones' || normalizedPath === '/white-settlement') return <WhiteSettlement />;
    if (normalizedPath === '/river-oaks-zultys' || normalizedPath === '/river-oaks') return <RiverOaks />;
    if (normalizedPath === '/hudson-oaks-tx-zultys-phone-systems' || normalizedPath === '/hudson-oaks') return <HudsonOaks />;
    if (normalizedPath === '/willow-park-tx-zultys-phone-systems' || normalizedPath === '/willow-park') return <WillowPark />;
    if (normalizedPath === '/everman-tx-zultys-phone-systems' || normalizedPath === '/everman') return <Everman />;
    if (normalizedPath === '/pantego-tx-zultys-phone-systems' || normalizedPath === '/pantego') return <Pantego />;
    if (normalizedPath === '/dalworthington-gardens-tx-zultys-phone-systems' || normalizedPath === '/dalworthington-gardens') return <DalworthingtonGardens />;
    if (normalizedPath === '/westover-hills-tx-zultys-phone-systems' || normalizedPath === '/westover-hills') return <WestoverHills />;
    if (normalizedPath === '/edgecliff-village-tx-zultys-phone-systems' || normalizedPath === '/edgecliff-village') return <EdgecliffVillage />;
    if (normalizedPath === '/richland-hills-tx-zultys-phone-systems' || normalizedPath === '/richland-hills') return <RichlandHills />;
    if (normalizedPath === '/sansom-park-tx-zultys-phone-systems' || normalizedPath === '/sansom-park') return <SansomPark />;
    if (normalizedPath === '/reno-tx-zultys-phone-systems' || normalizedPath === '/reno') return <Reno />;
    if (normalizedPath === '/van-alstyne-tx-zultys-phone-systems' || normalizedPath === '/van-alstyne') return <VanAlstyne />;
    if (normalizedPath === '/leonard-tx-zultys-phone-systems' || normalizedPath === '/leonard') return <Leonard />;
    if (normalizedPath === '/farmersville-tx-zultys-phone-systems' || normalizedPath === '/farmersville') return <Farmersville />;
    if (normalizedPath === '/howe-tx-zultys-phone-systems' || normalizedPath === '/howe') return <Howe />;
    if (normalizedPath === '/whitewright-tx-zultys-phone-systems' || normalizedPath === '/whitewright') return <Whitewright />;
    if (normalizedPath === '/gunter-tx-zultys-phone-systems' || normalizedPath === '/gunter') return <Gunter />;
    if (normalizedPath === '/collinsville-tx-zultys-phone-systems' || normalizedPath === '/collinsville') return <Collinsville />;
    if (normalizedPath === '/tioga-tx-zultys-phone-systems' || normalizedPath === '/tioga') return <Tioga />;
    if (normalizedPath === '/tom-bean-tx-zultys-phone-systems' || normalizedPath === '/tom-bean') return <TomBean />;
    if (normalizedPath === '/trenton-tx-zultys-phone-systems' || normalizedPath === '/trenton') return <Trenton />;
    if (normalizedPath === '/savoy-tx-zultys-phone-systems' || normalizedPath === '/savoy') return <Savoy />;
    if (normalizedPath === '/bells-tx-zultys-phone-systems' || normalizedPath === '/bells') return <Bells />;
    if (normalizedPath === '/blue-ridge-tx-zultys-phone-systems' || normalizedPath === '/blue-ridge') return <BlueRidge />;
    if (normalizedPath === '/ector-tx-zultys-phone-systems' || normalizedPath === '/ector') return <Ector />;
    if (normalizedPath === '/ravenna-tx-zultys-phone-systems' || normalizedPath === '/ravenna') return <Ravenna />;
    if (normalizedPath === '/bonham-tx-zultys-phone-systems' || normalizedPath === '/bonham') return <Bonham />;
    if (normalizedPath === '/honey-grove-tx-zultys-phone-systems' || normalizedPath === '/honey-grove') return <HoneyGrove />;
    if (normalizedPath === '/ladonia-tx-zultys-phone-systems' || normalizedPath === '/ladonia') return <Ladonia />;
    if (normalizedPath === '/windom-tx-zultys-phone-systems' || normalizedPath === '/windom') return <Windom />;
    if (normalizedPath === '/dodd-city-tx-zultys-phone-systems' || normalizedPath === '/dodd-city') return <DoddCity />;
    if (normalizedPath === '/merit-tx-zultys-phone-systems' || normalizedPath === '/merit') return <Merit />;
    if (normalizedPath === '/celeste-tx-zultys-phone-systems' || normalizedPath === '/celeste') return <Celeste />;
    if (normalizedPath === '/wolfe-city-tx-zultys-phone-systems' || normalizedPath === '/wolfe-city') return <WolfeCity />;
    if (normalizedPath === '/caddo-mills-tx-zultys-phone-systems' || normalizedPath === '/caddo-mills') return <CaddoMills />;
    if (normalizedPath === '/nevada-tx-zultys-phone-systems' || normalizedPath === '/nevada') return <Nevada />;
    if (normalizedPath === '/josephine-tx-zultys-phone-systems' || normalizedPath === '/josephine') return <Josephine />;
    if (normalizedPath === '/bailey-tx-zultys-phone-systems' || normalizedPath === '/bailey') return <Bailey />;
    if (normalizedPath === '/randolph-tx-zultys-phone-systems' || normalizedPath === '/randolph') return <Randolph />;
    if (normalizedPath === '/telephone-tx-zultys-phone-systems' || normalizedPath === '/telephone') return <Telephone />;
    if (normalizedPath === '/ivanhoe-tx-zultys-phone-systems' || normalizedPath === '/ivanhoe') return <Ivanhoe />;
    if (normalizedPath === '/gober-tx-zultys-phone-systems' || normalizedPath === '/gober') return <Gober />;
    
    // SEO URLs from user list
    if (normalizedPath === '/dallas-zultys-phones' || normalizedPath === '/dallas') return <DallasZultysPhones />;
    if (normalizedPath === '/fort-worth-zultys-systems' || normalizedPath === '/fort-worth') return <ZultysBusinessPhoneSystems />;
    if (normalizedPath === '/fort-worth-zultys-business-phone-systems') return <ZultysBusinessPhoneSystems />;
    if (normalizedPath === '/fort-worth-zultys-voip-phone-system') return <ZultysBusinessPhoneSystems />;
    if (normalizedPath === '/dallas-zultys-cloud-phones') return <CloudServices />;
    if (normalizedPath === '/fort-worth-zultys-cloud-phone-system') return <CloudServices />;
    if (normalizedPath === '/fort-worth-zultys-video-conferencing-system') return <MXconference />;
    if (normalizedPath === '/fort-worth-zultys-mx-series') return <MXSeries />;
    if (normalizedPath === '/fort-worth-zultys-mx-se') return <MXSE />;
    if (normalizedPath === '/fort-worth-zultys-mxmobile' || normalizedPath === '/fort-worth-zultys-mobile-zac') return <MXmobile />;
    if (normalizedPath === '/fort-worth-zultys-mxconference') return <MXconference />;
    if (normalizedPath === '/fort-worth-zultys-zac') return <ZAC />;
    if (normalizedPath === '/zultys-cloud-services') return <CloudServices />;
    if (normalizedPath === '/fort-worth-zultys-cloud-services') return <CloudServices />;
    if (normalizedPath === '/zultys-ip-phones') return <Products />;
    if (normalizedPath === '/fort-worth-zultys-zip-49g-phone') return <ZIP49G />;
    if (normalizedPath === '/fort-worth-zultys-zip-47g-phone') return <ZIP47G />;
    if (normalizedPath === '/fort-worth-zultys-zip-45g-phone') return <ZIP45G />;
    if (normalizedPath === '/fort-worth-zultys-zip-43g-phone') return <ZIP43G />;
    if (normalizedPath === '/fort-worth-zultys-z-23ge-phone' || normalizedPath === '/fort-worth-zultys-z23g-phone') return <Z23GE />;
    if (normalizedPath === '/fort-worth-zultys-z-22g-phone') return <Z22G />;
    if (normalizedPath === '/fort-worth-zultys-z-21i-phone') return <Z21i />;
    if (normalizedPath === '/fort-worth-zultys-gateways') return <Gateways />;
    if (normalizedPath === '/fort-worth-zultys-phone-system-small-business' || normalizedPath === '/fort-worth-zultys-small-business') return <SmallBusiness />;
    if (normalizedPath === '/fort-worth-zultys-healthcare') return <Healthcare />;
    if (normalizedPath === '/fort-worth-zultys-education') return <Education />;
    if (normalizedPath === '/fort-worth-zultys-professional-services') return <ProfessionalServices />;
    if (normalizedPath === '/fort-worth-zultys-real-estate') return <RealEstate />;
    if (normalizedPath === '/fort-worth-zultys-retail-automotive') return <RetailAutomotive />;
    if (normalizedPath === '/fort-worth-zultys-multi-location') return <MultiLocation />;
    if (normalizedPath === '/fort-worth-zultys-enterprise') return <Enterprise />;
    if (normalizedPath === '/sitemap.html' || normalizedPath === '/sitemap') return <Sitemap />;
    
    // Legacy/Other paths
    if (normalizedPath === '/zultys-support') return <Support />;
    if (normalizedPath === '/fort-worth-zultys-on-premise') return <OnPremise />;
    if (normalizedPath === '/fort-worth-zultys-hybrid') return <Hybrid />;
    if (normalizedPath === '/fort-worth-zultys-contact-center') return <ContactCenter />;
    if (normalizedPath === '/fort-worth-zultys-support') return <Support />;
    if (normalizedPath === '/fort-worth-zultys-installation') return <Installation />;
    if (normalizedPath === '/fort-worth-zultys-training') return <Training />;
    
    if (normalizedPath === '/addison-tx-zultys-phone-systems' || normalizedPath === '/addison') return <Addison />;
    if (normalizedPath === '/aledo-tx-zultys-phone-systems' || normalizedPath === '/aledo') return <Aledo />;
    if (normalizedPath === '/blue-mound-tx-zultys-phone-systems' || normalizedPath === '/blue-mound') return <BlueMound />;

    // Fallback for other paths
    return <NotFound />;
  };

  return (
    <QuoteProvider>
      <LocalBusinessSchema path={currentPath} />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {renderPage()}
      </Suspense>
      <Toaster position="top-right" richColors />
      <QuotePopupWrapper />
      <FloatingTextCTA />
      <PerformanceMonitor />
    </QuoteProvider>
  );
}
