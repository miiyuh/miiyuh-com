"use client";

import { Menu as MenuPrimitive } from "@ark-ui/react/menu";
import { Portal } from "@ark-ui/react/portal";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps } from "react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const Menu = MenuPrimitive.Root;

const MenuPortal = Portal;

function MenuTrigger(props: ComponentProps<typeof MenuPrimitive.Trigger>) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

function MenuPopup({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <Portal>
      <MenuPrimitive.Positioner
        className="z-50"
        data-slot="menu-positioner"
      >
        <MenuPrimitive.Content
          className={cn(
            "relative flex origin-(--transform-origin) rounded-lg border bg-popover bg-clip-padding shadow-lg transition-[scale,opacity] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:bg-clip-border",
            className,
          )}
          data-slot="menu-popup"
        >
          <div className="max-h-(--available-height) not-[class*='w-']:min-w-32 overflow-y-auto p-1" {...props} />
        </MenuPrimitive.Content>
      </MenuPrimitive.Positioner>
    </Portal>
  );
}

function MenuGroup(props: ComponentProps<typeof MenuPrimitive.ItemGroup>) {
  return <MenuPrimitive.ItemGroup data-slot="menu-group" {...props} />;
}

function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ComponentProps<typeof MenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-inset={inset}
      data-slot="menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  onCheckedChange,
  ...props
}: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "grid in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="menu-checkbox-item"
      {...props}
    >
      <MenuPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
      <MenuPrimitive.ItemText className="col-start-2">{children}</MenuPrimitive.ItemText>
    </MenuPrimitive.CheckboxItem>
  );
}

function MenuRadioGroup(props: ComponentProps<typeof MenuPrimitive.RadioItemGroup>) {
  return <MenuPrimitive.RadioItemGroup data-slot="menu-radio-group" {...props} />;
}

function MenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        "grid in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="menu-radio-item"
      {...props}
    >
      <MenuPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
      <MenuPrimitive.ItemText className="col-start-2">{children}</MenuPrimitive.ItemText>
    </MenuPrimitive.RadioItem>
  );
}

function MenuGroupLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof MenuPrimitive.ItemGroupLabel> & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.ItemGroupLabel
      className={cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8",
        className,
      )}
      data-inset={inset}
      data-slot="menu-label"
      {...props}
    />
  );
}

function MenuSeparator({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-border", className)}
      data-slot="menu-separator"
      {...props}
    />
  );
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ms-auto text-muted-foreground/64 text-xs tracking-widest",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

// Note: Ark UI doesn't have built-in submenu support like base-ui
// For now we export a simplified version - submenus would need to be nested Menu.Root components
const MenuSub = Menu;

function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.TriggerItem> & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.TriggerItem
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className,
      )}
      data-inset={inset}
      data-slot="menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </MenuPrimitive.TriggerItem>
  );
}

function MenuSubPopup({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPopup
      className={className}
      data-slot="menu-sub-content"
      {...props}
    />
  );
}

export {
  Menu,
  Menu as DropdownMenu,
  MenuPortal,
  MenuPortal as DropdownMenuPortal,
  MenuTrigger,
  MenuTrigger as DropdownMenuTrigger,
  MenuPopup,
  MenuPopup as DropdownMenuContent,
  MenuGroup,
  MenuGroup as DropdownMenuGroup,
  MenuItem,
  MenuItem as DropdownMenuItem,
  MenuCheckboxItem,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuGroupLabel,
  MenuGroupLabel as DropdownMenuLabel,
  MenuSeparator,
  MenuSeparator as DropdownMenuSeparator,
  MenuShortcut,
  MenuShortcut as DropdownMenuShortcut,
  MenuSub,
  MenuSub as DropdownMenuSub,
  MenuSubTrigger,
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuSubPopup,
  MenuSubPopup as DropdownMenuSubContent,
};
