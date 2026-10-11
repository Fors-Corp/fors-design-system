import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  ArchiveRestore,
  ArrowLeft,
  Banknote,
  Bold,
  BrushCleaning,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code,
  Copy,
  Download,
  EllipsisVertical,
  Eye,
  EyeOff,
  File,
  FileText,
  Folder,
  Globe,
  Heading1,
  Heading2,
  Heading3,
  History,
  House,
  ImageIcon,
  Italic,
  Key,
  Layers,
  LayoutDashboard,
  Link,
  List,
  ListOrdered,
  LogOut,
  Menu,
  Moon,
  Package,
  PackagePlus,
  Pencil,
  Plus,
  Quote,
  Receipt,
  Redo2,
  Save,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Strikethrough,
  Sun,
  Tag,
  Trash,
  Trash2,
  Underline,
  Undo2,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";

/**
 * Props shared by every Fors icon. `size` is the rendered width/height in px
 * (default 20 — matches the 20px glyph slot used by `Button`, `SidebarNavItem`
 * and `Input` adornments); `strokeWidth` defaults to 1.75 for the Fors line
 * weight. Icons are decorative by default (`aria-hidden="true"`); for a
 * meaningful, standalone icon pass `aria-hidden={false}`, `role="img"` and an
 * `aria-label`.
 */
export type IconProps = Omit<LucideProps, "ref">;

export type ForsIcon = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

function createIcon(Glyph: LucideIcon, displayName: string): ForsIcon {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, strokeWidth = 1.75, ...props }, ref) => (
      <Glyph ref={ref} size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />
    )
  );
  Icon.displayName = displayName;
  return Icon;
}

// Curated, Fors-named subset of Lucide (ISC — see THIRD_PARTY_NOTICES.md).
// Naming is by meaning in a Fors app, not by glyph, so a consumer never has
// to know which upstream icon backs "delete" or "sales". Each export is a
// separate /*#__PURE__*/ call so unused icons tree-shake out of consumers.

// Actions
export const IconPlus = /*#__PURE__*/ createIcon(Plus, "IconPlus");
export const IconEdit = /*#__PURE__*/ createIcon(Pencil, "IconEdit");
export const IconSave = /*#__PURE__*/ createIcon(Save, "IconSave");
export const IconDownload = /*#__PURE__*/ createIcon(Download, "IconDownload");
export const IconUpload = /*#__PURE__*/ createIcon(Upload, "IconUpload");
export const IconTrash = /*#__PURE__*/ createIcon(Trash2, "IconTrash");
export const IconTrashForever = /*#__PURE__*/ createIcon(Trash, "IconTrashForever");
export const IconTrashSweep = /*#__PURE__*/ createIcon(BrushCleaning, "IconTrashSweep");
export const IconTrashRestore = /*#__PURE__*/ createIcon(ArchiveRestore, "IconTrashRestore");
export const IconCartPlus = /*#__PURE__*/ createIcon(PackagePlus, "IconCartPlus");
export const IconArrowLeft = /*#__PURE__*/ createIcon(ArrowLeft, "IconArrowLeft");
export const IconLogOut = /*#__PURE__*/ createIcon(LogOut, "IconLogOut");

// Navigation & chrome
export const IconMenu = /*#__PURE__*/ createIcon(Menu, "IconMenu");
export const IconMoreVertical = /*#__PURE__*/ createIcon(EllipsisVertical, "IconMoreVertical");
export const IconX = /*#__PURE__*/ createIcon(X, "IconX");
export const IconHome = /*#__PURE__*/ createIcon(House, "IconHome");
export const IconSettings = /*#__PURE__*/ createIcon(Settings, "IconSettings");
export const IconHistory = /*#__PURE__*/ createIcon(History, "IconHistory");
export const IconSun = /*#__PURE__*/ createIcon(Sun, "IconSun");
export const IconMoon = /*#__PURE__*/ createIcon(Moon, "IconMoon");

// Domain
export const IconStore = /*#__PURE__*/ createIcon(Store, "IconStore");
export const IconShoppingCart = /*#__PURE__*/ createIcon(ShoppingCart, "IconShoppingCart");
export const IconReceipt = /*#__PURE__*/ createIcon(Receipt, "IconReceipt");
export const IconBanknote = /*#__PURE__*/ createIcon(Banknote, "IconBanknote");
export const IconPackage = /*#__PURE__*/ createIcon(Package, "IconPackage");
export const IconTag = /*#__PURE__*/ createIcon(Tag, "IconTag");
export const IconUsers = /*#__PURE__*/ createIcon(Users, "IconUsers");
export const IconUserCheck = /*#__PURE__*/ createIcon(UserCheck, "IconUserCheck");

// Content, files & media
export const IconImage = /*#__PURE__*/ createIcon(ImageIcon, "IconImage");
export const IconFile = /*#__PURE__*/ createIcon(File, "IconFile");
export const IconFileText = /*#__PURE__*/ createIcon(FileText, "IconFileText");
export const IconFolder = /*#__PURE__*/ createIcon(Folder, "IconFolder");
export const IconKey = /*#__PURE__*/ createIcon(Key, "IconKey");
export const IconCopy = /*#__PURE__*/ createIcon(Copy, "IconCopy");
export const IconCheck = /*#__PURE__*/ createIcon(Check, "IconCheck");

// Directional
export const IconChevronUp = /*#__PURE__*/ createIcon(ChevronUp, "IconChevronUp");
export const IconChevronDown = /*#__PURE__*/ createIcon(ChevronDown, "IconChevronDown");
export const IconChevronLeft = /*#__PURE__*/ createIcon(ChevronLeft, "IconChevronLeft");
export const IconChevronRight = /*#__PURE__*/ createIcon(ChevronRight, "IconChevronRight");

// Text editing
export const IconBold = /*#__PURE__*/ createIcon(Bold, "IconBold");
export const IconItalic = /*#__PURE__*/ createIcon(Italic, "IconItalic");
export const IconUnderline = /*#__PURE__*/ createIcon(Underline, "IconUnderline");
export const IconStrikethrough = /*#__PURE__*/ createIcon(Strikethrough, "IconStrikethrough");
export const IconHeading1 = /*#__PURE__*/ createIcon(Heading1, "IconHeading1");
export const IconHeading2 = /*#__PURE__*/ createIcon(Heading2, "IconHeading2");
export const IconHeading3 = /*#__PURE__*/ createIcon(Heading3, "IconHeading3");
export const IconList = /*#__PURE__*/ createIcon(List, "IconList");
export const IconListOrdered = /*#__PURE__*/ createIcon(ListOrdered, "IconListOrdered");
export const IconQuote = /*#__PURE__*/ createIcon(Quote, "IconQuote");
export const IconLink = /*#__PURE__*/ createIcon(Link, "IconLink");
export const IconCode = /*#__PURE__*/ createIcon(Code, "IconCode");
export const IconUndo = /*#__PURE__*/ createIcon(Undo2, "IconUndo");
export const IconRedo = /*#__PURE__*/ createIcon(Redo2, "IconRedo");

// Visibility, search & layout
export const IconEye = /*#__PURE__*/ createIcon(Eye, "IconEye");
export const IconEyeOff = /*#__PURE__*/ createIcon(EyeOff, "IconEyeOff");
export const IconSearch = /*#__PURE__*/ createIcon(Search, "IconSearch");
export const IconGlobe = /*#__PURE__*/ createIcon(Globe, "IconGlobe");
export const IconLayoutDashboard = /*#__PURE__*/ createIcon(LayoutDashboard, "IconLayoutDashboard");
export const IconLayers = /*#__PURE__*/ createIcon(Layers, "IconLayers");
