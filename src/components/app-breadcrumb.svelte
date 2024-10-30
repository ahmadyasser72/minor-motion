<script lang="ts">
  import ClientOnly from "$lib/components/client-only.svelte";

  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import type { BreadcrumbItem } from "$lib/types";

  import { House } from "lucide-svelte";

  export let breadcrumbs: BreadcrumbItem[];
</script>

{#if breadcrumbs.length > 0}
  <Breadcrumb.Root class="mb-2">
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">
          <House class="h-6 w-6" />
        </Breadcrumb.Link>
      </Breadcrumb.Item>

      {#each breadcrumbs as { label, href }}
        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          {#if Array.isArray(label)}
            <ClientOnly>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger class="flex items-center gap-1">
                  <Breadcrumb.Ellipsis class="h-4 w-4" />
                  <span class="sr-only">Toggle menu</span>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="start">
                  {#each label as child}
                    <DropdownMenu.Item href={child.href} class="cursor-pointer">
                      {child.label}
                    </DropdownMenu.Item>
                  {/each}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              <Breadcrumb.Ellipsis class="h-4 w-4" slot="fallback" />
            </ClientOnly>
          {:else if href !== undefined}
            <Breadcrumb.Link {href}>{label}</Breadcrumb.Link>
          {:else}
            <Breadcrumb.Page>{label}</Breadcrumb.Page>
          {/if}
        </Breadcrumb.Item>
      {/each}
    </Breadcrumb.List>
  </Breadcrumb.Root>
{/if}
