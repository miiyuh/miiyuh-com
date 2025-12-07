"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Radio, RadioGroup } from "@/components/ui/radio-group"
import { Slider, SliderValue } from "@/components/ui/slider"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from "@/components/ui/alert-dialog"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, Toggle as ToggleGroupItem } from "@/components/ui/toggle-group"
import { Menu, MenuTrigger, MenuPopup, MenuItem, MenuSeparator, MenuGroup, MenuGroupLabel } from "@/components/ui/menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoIcon, BoldIcon, ItalicIcon, UnderlineIcon, MoreHorizontalIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, InboxIcon } from "lucide-react"

const SECTION_CARD = "relative rounded-2xl border border-white/12 bg-gradient-to-br from-white/3 to-white/1 backdrop-blur-xl shadow-lg shadow-black/20 overflow-hidden"
const SECTION_TITLE = "text-lg font-semibold tracking-tight text-white"
const SECTION_SUB = "text-sm text-white/70"

export default function ComponentsLabPage() {
  const [name, setName] = useState("Ada Lovelace")
  const [note, setNote] = useState("Excited to see these components in one place.")
  const [checked, setChecked] = useState(false)
  const [plan, setPlan] = useState("pro")
  const [slider, setSlider] = useState<number[]>([64])
  const progressValue = useMemo(() => Math.min(100, slider[0]), [slider])

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 text-[#FAF3E0] lg:gap-12 lg:px-10">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-linear-to-r from-[#0f172a] via-[#111827] to-[#0b1220] px-8 py-8 shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-4 duration-500 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Component Lab</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Visual testbed for UI primitives</h1>
            <p className="text-base text-white/70">
              Alphabetical A → Z showcase with refreshed spacing and glass panels.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            <Badge variant="secondary">Dark theme</Badge>
            <Badge variant="outline">Ark + Radix primitives</Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 *:animate-in *:fade-in *:slide-in-from-bottom-4 *:duration-500 lg:gap-8">
        {/* Accordion */}
        <Card className={`${SECTION_CARD} [animation-delay:50ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Accordion</CardTitle>
            <CardDescription className={SECTION_SUB}>Expandable content sections</CardDescription>
          </CardHeader>
          <CardPanel>
            <Accordion defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with glass styling that matches the dark theme.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>Yes. Smooth height transitions included.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardPanel>
        </Card>

        {/* Alerts */}
        <Card className={`${SECTION_CARD} [animation-delay:100ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Alerts</CardTitle>
            <CardDescription className={SECTION_SUB}>Inline notification messages</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <Alert>
              <InfoIcon className="size-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert with an info icon.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircleIcon className="size-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangleIcon className="size-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Heads up! Something needs attention.</AlertDescription>
            </Alert>
            <Alert variant="error">
              <XCircleIcon className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>We could not process that request.</AlertDescription>
            </Alert>
          </CardPanel>
        </Card>

        {/* Avatar */}
        <Card className={`${SECTION_CARD} [animation-delay:150ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Avatar</CardTitle>
            <CardDescription className={SECTION_SUB}>User profile images</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="size-8">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar className="size-14">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </CardPanel>
        </Card>

        {/* Badges */}
        <Card className={`${SECTION_CARD} [animation-delay:200ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Badges</CardTitle>
            <CardDescription className={SECTION_SUB}>Status accents & pills</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </CardPanel>
        </Card>

        {/* Buttons */}
        <Card className={`${SECTION_CARD} [animation-delay:250ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Buttons</CardTitle>
            <CardDescription className={SECTION_SUB}>Variant and size matrix</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="xs" variant="secondary">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon">☆</Button>
            </div>
          </CardPanel>
        </Card>

        {/* Dialogs & Alerts */}
        <Card className={`${SECTION_CARD} [animation-delay:300ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Dialogs & Alerts</CardTitle>
            <CardDescription className={SECTION_SUB}>Modal overlays for interactions</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog description. Dialogs are modal windows.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-white/70">Dialog content goes here.</div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Alert</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </AlertDialogClose>
                  <AlertDialogClose asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogClose>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardPanel>
        </Card>

        {/* Empty State */}
        <Card className={`${SECTION_CARD} [animation-delay:350ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Empty State</CardTitle>
            <CardDescription className={SECTION_SUB}>Placeholder for empty content</CardDescription>
          </CardHeader>
          <CardPanel>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <InboxIcon className="size-5" />
                </EmptyMedia>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any messages yet. Start a conversation!
                </EmptyDescription>
              </EmptyHeader>
              <Button size="sm">Send a message</Button>
            </Empty>
          </CardPanel>
        </Card>

        {/* Form Controls */}
        <Card className={`${SECTION_CARD} [animation-delay:400ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Form Controls</CardTitle>
            <CardDescription className={SECTION_SUB}>Inputs, textarea, toggles</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <label className="flex items-center gap-3 text-sm text-white/80">
              <Checkbox checked={checked} onCheckedChange={(v) => setChecked(Boolean(v.valueOf()))} />
              <span>Remember my choices</span>
            </label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          </CardPanel>
        </Card>

        {/* Heading with Hash */}
        <Card className={`${SECTION_CARD} [animation-delay:450ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Heading with Hash</CardTitle>
            <CardDescription className={SECTION_SUB}>Anchor links with copy button</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-2">
            <p className="text-sm text-white/75">
              Headings can have hash anchors that appear on hover, making them shareable and linkable.
            </p>
          </CardPanel>
        </Card>

        {/* Input */}
        <Card className={`${SECTION_CARD} [animation-delay:500ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Input</CardTitle>
            <CardDescription className={SECTION_SUB}>Text input field with glass styling</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            <Input type="search" placeholder="Search the docs" />
            <Input type="email" placeholder="Email address" />
          </CardPanel>
        </Card>

        {/* Kbd */}
        <Card className={`${SECTION_CARD} [animation-delay:550ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Kbd (Keyboard)</CardTitle>
            <CardDescription className={SECTION_SUB}>Keyboard shortcut display</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <div className="flex items-center gap-2">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
              <span className="text-sm text-white/50">or</span>
              <KbdGroup>
                <Kbd>Cmd</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </CardPanel>
        </Card>

        {/* Label */}
        <Card className={`${SECTION_CARD} [animation-delay:600ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Label</CardTitle>
            <CardDescription className={SECTION_SUB}>Form field labels</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <Label>Email Address</Label>
            <Label>Password</Label>
            <Label>Remember me</Label>
          </CardPanel>
        </Card>

        {/* Menu */}
        <Card className={`${SECTION_CARD} [animation-delay:650ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Menu / Dropdown</CardTitle>
            <CardDescription className={SECTION_SUB}>Contextual action menus</CardDescription>
          </CardHeader>
          <CardPanel className="flex gap-3">
            <Menu>
              <MenuTrigger asChild>
                <Button variant="outline">
                  Options <MoreHorizontalIcon className="ml-2 size-4" />
                </Button>
              </MenuTrigger>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Actions</MenuGroupLabel>
                  <MenuItem value="new-file">New File</MenuItem>
                  <MenuItem value="new-folder">New Folder</MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuItem value="settings">Settings</MenuItem>
                  <MenuItem value="delete" variant="destructive">Delete</MenuItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </CardPanel>
        </Card>

        {/* Popover */}
        <Card className={`${SECTION_CARD} [animation-delay:700ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Popover</CardTitle>
            <CardDescription className={SECTION_SUB}>Floating content panel</CardDescription>
          </CardHeader>
          <CardPanel className="flex gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Popover Title</h4>
                  <p className="text-sm text-white/70">
                    Popovers are great for showing additional information or controls.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardPanel>
        </Card>

        {/* Progress */}
        <Card className={`${SECTION_CARD} [animation-delay:750ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Progress</CardTitle>
            <CardDescription className={SECTION_SUB}>Gradient progress indicator</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            <Progress value={progressValue} max={100}>
              <ProgressLabel>Progress</ProgressLabel>
              <ProgressValue>{progressValue}%</ProgressValue>
            </Progress>
          </CardPanel>
        </Card>

        {/* Radio Group */}
        <Card className={`${SECTION_CARD} [animation-delay:800ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Radio Group</CardTitle>
            <CardDescription className={SECTION_SUB}>Single selection from multiple options</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-2">
            <RadioGroup value={plan} onValueChange={(v) => setPlan(String(v.value))} className="gap-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Radio value="starter" id="plan-starter" />
                <label htmlFor="plan-starter">Starter</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Radio value="pro" id="plan-pro" />
                <label htmlFor="plan-pro">Pro</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <Radio value="enterprise" id="plan-enterprise" />
                <label htmlFor="plan-enterprise">Enterprise</label>
              </div>
            </RadioGroup>
          </CardPanel>
        </Card>

        {/* Scroll Area */}
        <Card className={`${SECTION_CARD} [animation-delay:850ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Scroll Area</CardTitle>
            <CardDescription className={SECTION_SUB}>Custom scrollable container</CardDescription>
          </CardHeader>
          <CardPanel>
            <ScrollArea className="h-48 w-full rounded-lg border border-white/12 bg-white/5 p-4">
              <div className="space-y-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-white/10" />
                    <div>
                      <p className="text-sm font-medium text-white">Item {i + 1}</p>
                      <p className="text-xs text-white/50">Description for item {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardPanel>
        </Card>

        {/* Separator */}
        <Card className={`${SECTION_CARD} [animation-delay:900ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Separator</CardTitle>
            <CardDescription className={SECTION_SUB}>Visual dividers</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <p className="text-sm text-white/75">Above separator</p>
            <Separator />
            <p className="text-sm text-white/75">Below separator</p>
          </CardPanel>
        </Card>

        {/* Skeleton */}
        <Card className={`${SECTION_CARD} [animation-delay:950ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Skeleton</CardTitle>
            <CardDescription className={SECTION_SUB}>Loading placeholder shimmer</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* Slider */}
        <Card className={`${SECTION_CARD} [animation-delay:1000ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Slider</CardTitle>
            <CardDescription className={SECTION_SUB}>Range input with gradient</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-5">
            <Slider value={slider} onValueChange={(v) => setSlider(v.value)} min={0} max={100}>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Volume</span>
                <SliderValue>{slider[0]}</SliderValue>
              </div>
            </Slider>
          </CardPanel>
        </Card>

        {/* Spinner */}
        <Card className={`${SECTION_CARD} [animation-delay:1050ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Spinner</CardTitle>
            <CardDescription className={SECTION_SUB}>Loading indicators</CardDescription>
          </CardHeader>
          <CardPanel className="flex items-center gap-4">
            <Spinner />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
          </CardPanel>
        </Card>

        {/* Switch */}
        <Card className={`${SECTION_CARD} [animation-delay:1100ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Switch</CardTitle>
            <CardDescription className={SECTION_SUB}>Toggle on/off states</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm text-white/80">
              <span>Enable notifications</span>
              <Switch checked={checked} onCheckedChange={(v) => setChecked(Boolean(v.valueOf()))} />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm text-white/80">
              <span>Dark mode</span>
              <Switch defaultChecked />
            </label>
          </CardPanel>
        </Card>

        {/* Table */}
        <Card className={`${SECTION_CARD} xl:col-span-2 [animation-delay:1150ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Table</CardTitle>
            <CardDescription className={SECTION_SUB}>Tabular data display with glass styling</CardDescription>
          </CardHeader>
          <CardPanel>
            <Table>
              <TableCaption>A list of recent invoices</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><Badge variant="success">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell><Badge variant="destructive">Unpaid</Badge></TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardPanel>
        </Card>

        {/* Tabs */}
        <Card className={`${SECTION_CARD} [animation-delay:1200ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Tabs</CardTitle>
            <CardDescription className={SECTION_SUB}>Underline indicator navigation</CardDescription>
          </CardHeader>
          <CardPanel>
            <Tabs defaultValue="design">
              <TabsList variant="underline" className="mb-4">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="dev">Dev</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>
              <TabsContent value="design" className="text-sm text-white/75 animate-in fade-in">
                Design tokens, spacing, and glass panels.
              </TabsContent>
              <TabsContent value="dev" className="text-sm text-white/75 animate-in fade-in">
                Typesafe primitives built on Ark UI.
              </TabsContent>
              <TabsContent value="review" className="text-sm text-white/75 animate-in fade-in">
                QA passes accessibility and keyboard flows.
              </TabsContent>
            </Tabs>
          </CardPanel>
        </Card>

        {/* Toggle */}
        <Card className={`${SECTION_CARD} [animation-delay:1250ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Toggle</CardTitle>
            <CardDescription className={SECTION_SUB}>Binary state controls</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-2">
            <Toggle variant="outline" aria-label="Toggle bold">
              <BoldIcon className="size-4" />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle italic">
              <ItalicIcon className="size-4" />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle underline">
              <UnderlineIcon className="size-4" />
            </Toggle>
          </CardPanel>
        </Card>

        {/* Toggle Group */}
        <Card className={`${SECTION_CARD} [animation-delay:1300ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Toggle Group</CardTitle>
            <CardDescription className={SECTION_SUB}>Grouped selection controls</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div>
              <Label className="mb-2 block text-white/70">Text alignment</Label>
              <ToggleGroup variant="outline" defaultValue={["left"]}>
                <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardPanel>
        </Card>

        {/* Tooltip */}
        <Card className={`${SECTION_CARD} [animation-delay:1350ms]`}>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Tooltip</CardTitle>
            <CardDescription className={SECTION_SUB}>Hover hints and helpers</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip with helpful information</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <InfoIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Info tooltip</p>
              </TooltipContent>
            </Tooltip>
          </CardPanel>
        </Card>
      </div>
    </main>
  )
}