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
import { Progress, ProgressLabel, ProgressTrack, ProgressIndicator, ProgressValue } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogClose } from "@/components/ui/alert-dialog"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, Toggle as ToggleGroupItem } from "@/components/ui/toggle-group"
import { Menu, MenuTrigger, MenuPopup, MenuItem, MenuCheckboxItem, MenuSeparator, MenuGroup, MenuGroupLabel } from "@/components/ui/menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, CheckCircle, Warning, XCircle, Tray, DotsThree, TextB, TextItalic, TextUnderline, FolderOpen } from "@phosphor-icons/react"
import { HeadingWithHash } from "@/components/ui/heading-with-hash"
import { DevPageShell } from "@/components/ui/dev-page-shell"
import { SECTION_TITLE, SECTION_SUB } from "@/config/dev-pages"

export default function ComponentsLabPage() {
  const [name, setName] = useState("Ada Lovelace")
  const [note, setNote] = useState("Excited to see these components in one place.")
  const [checked, setChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [plan, setPlan] = useState("pro")
  const [slider, setSlider] = useState<number[]>([64])
  const progressValue = useMemo(() => Math.min(100, slider[0]), [slider])
  const [count, setCount] = useState(0)
  const [boldEnabled, setBoldEnabled] = useState(false)
  const [alignment, setAlignment] = useState<string[]>(["left"])
  const [accordionValue, setAccordionValue] = useState<string[]>(["item-2"])
  const [showDetails, setShowDetails] = useState(true)
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true)
  const [logMessages, setLogMessages] = useState(true)

  return (
    <DevPageShell>
      <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl px-8 py-8 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.8)] lg:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">UI component library</h1>
            <p className="text-base text-text-secondary">
              A → Z showcase of every UI primitive in the design system.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Ark UI + Radix primitives</Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-7 xl:grid-cols-2 lg:gap-8">
        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Accordion</CardTitle>
            <CardDescription className={SECTION_SUB}>Expandable content sections</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div>
              <p className="mb-2 text-xs text-text-muted">Uncontrolled (defaultOpen)</p>
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
            </div>
            <Separator />
            <div>
              <p className="mb-2 text-xs text-text-muted">
                Controlled: open = {accordionValue.join(", ") || "(none)"}
              </p>
              <Accordion value={accordionValue} onValueChange={(v) => setAccordionValue(v.value)}>
                <AccordionItem value="a">
                  <AccordionTrigger>Section A</AccordionTrigger>
                  <AccordionContent>Content for section A.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Section B</AccordionTrigger>
                  <AccordionContent>Content for section B.</AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-2 flex gap-2">
                <Button size="xs" variant="secondary" onClick={() => setAccordionValue(["a"])}>Open A</Button>
                <Button size="xs" variant="secondary" onClick={() => setAccordionValue(["b"])}>Open B</Button>
                <Button size="xs" variant="ghost" onClick={() => setAccordionValue([])}>Collapse all</Button>
              </div>
            </div>
          </CardPanel>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Alerts</CardTitle>
            <CardDescription className={SECTION_SUB}>Inline notification messages</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <Alert>
              <Info className="size-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert with an info icon.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle className="size-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <Warning className="size-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Heads up! Something needs attention.</AlertDescription>
            </Alert>
            <Alert variant="error">
              <XCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>We could not process that request.</AlertDescription>
            </Alert>
          </CardPanel>
        </Card>

        {/* Avatar */}
        <Card>
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
        <Card>
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
        <Card>
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
            <div className="flex flex-wrap gap-2 items-center">
              <Button disabled>Disabled</Button>
              <Button onClick={() => setCount((c) => c + 1)}>
                Clicked {count} {count === 1 ? "time" : "times"}
              </Button>
            </div>
          </CardPanel>
        </Card>

        {/* Dialogs & Alerts */}
        <Card>
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
                  <DialogTitle>New project</DialogTitle>
                  <DialogDescription>
                    Create a new project to get started.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 px-6 py-4" onSubmit={(e) => { e.preventDefault(); alert("Submitted!"); }}>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dialog-name">Project name</Label>
                    <Input id="dialog-name" placeholder="my-project" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dialog-desc">Description</Label>
                    <Textarea id="dialog-desc" placeholder="Optional description" rows={2} />
                  </div>
                  <label className="flex items-center gap-3 text-sm text-text-secondary">
                    <Checkbox defaultChecked />
                    <span>Create from template</span>
                  </label>
                  <DialogFooter className="!pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
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
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Empty State</CardTitle>
            <CardDescription className={SECTION_SUB}>Placeholder for empty content</CardDescription>
          </CardHeader>
          <CardPanel className="grid gap-4 md:grid-cols-3">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Tray className="size-5" />
                </EmptyMedia>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any messages yet. Start a conversation!
                </EmptyDescription>
              </EmptyHeader>
              <Button size="sm">Send a message</Button>
            </Empty>

            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen className="size-5" />
                </EmptyMedia>
                <EmptyTitle>No projects</EmptyTitle>
                <EmptyDescription>
                  Projects you create will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>

            <Empty>
              <EmptyHeader>
                <EmptyTitle>No results</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or filters.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardPanel>
        </Card>

        {/* Form Controls */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Checkbox &amp; Textarea</CardTitle>
            <CardDescription className={SECTION_SUB}>Binary selection and multi-line input</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <label className="flex items-center gap-3 text-sm text-text-secondary">
              <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v.checked === true)} />
              <span>Remember my choices</span>
            </label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          </CardPanel>
        </Card>

        {/* Heading with Hash */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Heading with Hash</CardTitle>
            <CardDescription className={SECTION_SUB}>Anchor links with copy button</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-2">
            <HeadingWithHash id="demo-heading" level="h3">
              Demo heading with hash link
            </HeadingWithHash>
            <p className="text-sm text-text-secondary">
              Hover the heading to reveal the # link and click to copy the URL.
            </p>
          </CardPanel>
        </Card>

        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Input</CardTitle>
            <CardDescription className={SECTION_SUB}>Text input field with glass styling</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            <Input type="search" placeholder="Search the docs" />
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number" />
            <Input type="file" />
            <Input disabled value="Disabled input" />
          </CardPanel>
        </Card>

        {/* Kbd */}
        <Card>
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
              <span className="text-sm text-text-muted">or</span>
              <KbdGroup>
                <Kbd>Cmd</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </CardPanel>
        </Card>

        {/* Label */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Label</CardTitle>
            <CardDescription className={SECTION_SUB}>Form field labels — clicking focuses the associated input</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="lab-email">Email</Label>
              <Input id="lab-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="lab-terms" />
              <Label htmlFor="lab-terms" className="text-sm text-text-secondary">Accept terms and conditions</Label>
            </div>
          </CardPanel>
        </Card>

        {/* Menu */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Menu / Dropdown</CardTitle>
            <CardDescription className={SECTION_SUB}>Contextual action menus</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-3">
            <Menu>
              <MenuTrigger asChild>
                <Button variant="outline">
                  Options <DotsThree className="ml-2 size-4" />
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

            <Menu>
              <MenuTrigger asChild>
                <Button variant="secondary">Preferences</Button>
              </MenuTrigger>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Display</MenuGroupLabel>
                  <MenuCheckboxItem
                    value="show-details"
                    checked={showDetails}
                    onCheckedChange={(v) => setShowDetails(v)}
                  >
                    Show details
                  </MenuCheckboxItem>
                  <MenuCheckboxItem
                    value="tooltips"
                    checked={tooltipsEnabled}
                    onCheckedChange={(v) => setTooltipsEnabled(v)}
                  >
                    Tooltips
                  </MenuCheckboxItem>
                  <MenuCheckboxItem
                    value="log-messages"
                    checked={logMessages}
                    onCheckedChange={(v) => setLogMessages(v)}
                  >
                    Log messages
                  </MenuCheckboxItem>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </CardPanel>
        </Card>

        {/* Popover */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Popover</CardTitle>
            <CardDescription className={SECTION_SUB}>Floating content panel</CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Popover Title</h4>
                  <p className="text-sm text-text-secondary">
                    Popovers are great for showing additional information or controls.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Loading state</Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <Spinner className="size-6" />
                  <p className="text-sm text-text-secondary">Fetching data…</p>
                </div>
              </PopoverContent>
            </Popover>
          </CardPanel>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Progress</CardTitle>
            <CardDescription className={SECTION_SUB}>Gradient progress indicator</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            <Progress value={progressValue} max={100}>
              <ProgressLabel>Progress</ProgressLabel>
              <ProgressValue>{progressValue}%</ProgressValue>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </CardPanel>
        </Card>

        {/* Radio Group */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Radio Group</CardTitle>
            <CardDescription className={SECTION_SUB}>Single selection from multiple options</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-2">
            <RadioGroup value={plan} onValueChange={(v) => setPlan(String(v.value))} className="gap-2">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Radio value="starter" id="plan-starter" />
                <label htmlFor="plan-starter">Starter</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Radio value="pro" id="plan-pro" />
                <label htmlFor="plan-pro">Pro</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Radio value="enterprise" id="plan-enterprise" />
                <label htmlFor="plan-enterprise">Enterprise</label>
              </div>
            </RadioGroup>
          </CardPanel>
        </Card>

        {/* Scroll Area */}
        <Card>
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
                      <p className="text-sm font-medium text-text-primary">Item {i + 1}</p>
                      <p className="text-xs text-text-muted">Description for item {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardPanel>
        </Card>

        {/* Separator */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Separator</CardTitle>
            <CardDescription className={SECTION_SUB}>Visual dividers</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-3">
            <p className="text-sm text-text-secondary">Above separator</p>
            <Separator />
            <p className="text-sm text-text-secondary">Below separator</p>
          </CardPanel>
        </Card>

        {/* Skeleton */}
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Slider</CardTitle>
            <CardDescription className={SECTION_SUB}>Range input with gradient</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-5">
            <Slider value={slider} onValueChange={(v) => setSlider(v.value)} min={0} max={100}>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Volume</span>
                <SliderValue>{slider[0]}</SliderValue>
              </div>
            </Slider>
          </CardPanel>
        </Card>

        {/* Spinner */}
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Switch</CardTitle>
            <CardDescription className={SECTION_SUB}>Toggle on/off states</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm text-text-secondary">
              <span>Enable notifications</span>
              <Switch checked={switchChecked} onCheckedChange={(v) => setSwitchChecked(v.checked === true)} />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm text-text-secondary">
              <span>Dark mode</span>
              <Switch defaultChecked />
            </label>
          </CardPanel>
        </Card>

        {/* Table */}
        <Card className="xl:col-span-2">
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
        <Card>
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
              <TabsContent value="design" className="text-sm text-text-secondary">
                Design tokens, spacing, and glass panels.
              </TabsContent>
              <TabsContent value="dev" className="text-sm text-text-secondary">
                Typesafe primitives built on Ark UI.
              </TabsContent>
              <TabsContent value="review" className="text-sm text-text-secondary">
                QA passes accessibility and keyboard flows.
              </TabsContent>
            </Tabs>
          </CardPanel>
        </Card>

        {/* Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Toggle</CardTitle>
            <CardDescription className={SECTION_SUB}>Binary state controls</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Toggle variant="outline" aria-label="Toggle bold">
                <TextB className="size-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Toggle italic">
                <TextItalic className="size-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Toggle underline">
                <TextUnderline className="size-4" />
              </Toggle>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <Toggle variant="outline" pressed={boldEnabled} onPressedChange={setBoldEnabled}>
                <TextB className="size-4" />
              </Toggle>
              <span>Controlled: {boldEnabled ? "Bold ON" : "Bold OFF"}</span>
            </div>
          </CardPanel>
        </Card>

        {/* Toggle Group */}
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>Toggle Group</CardTitle>
            <CardDescription className={SECTION_SUB}>Grouped selection controls</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div>
              <Label className="mb-2 block text-text-secondary">Text alignment (uncontrolled)</Label>
              <ToggleGroup variant="outline" defaultValue={["left"]}>
                <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <Label className="mb-2 block text-text-secondary">Alignment: {alignment[0]}</Label>
              <ToggleGroup variant="outline" value={alignment} onValueChange={(v) => setAlignment(v.value)}>
                <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardPanel>
        </Card>

        {/* Tooltip */}
        <Card>
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
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Info tooltip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip openDelay={0}>
              <TooltipTrigger asChild>
                <Button variant="destructive" size="icon" aria-label="Error">
                  <XCircle className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-red-400">Connection failed. Retrying in 5s…</p>
              </TooltipContent>
            </Tooltip>
          </CardPanel>
        </Card>
      </div>
    </DevPageShell>
  )
}