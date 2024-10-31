<script lang="ts">
  import ClientOnly from "$lib/components/client-only.svelte";

  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import type { BreadcrumbItem } from "$lib/types";

  import { ChevronDown, House } from "lucide-svelte";

  interface Props {
    breadcrumbs: BreadcrumbItem[];
  }

  let { breadcrumbs }: Props = $props();
</script>

{#if breadcrumbs.length > 0}
  <Breadcrumb.Root class="mb-2">
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/">
          <House class="h-6 w-6" />
        </Breadcrumb.Link>
      </Breadcrumb.Item>

      {#each breadcrumbs as { children, label, href }}
        <Breadcrumb.Separator />

        <Breadcrumb.Item>
          {#if Array.isArray(children)}
            {#snippet content()}
              {#if label === undefined}
                <Breadcrumb.Ellipsis class="h-4 w-4" />
              {:else}
                <Breadcrumb.Page class="flex items-center">
                  {label}
                  <ChevronDown class="h-4 w-4 ml-1" />
                </Breadcrumb.Page>
              {/if}
              <span class="sr-only">Toggle menu</span>
            {/snippet}

            <ClientOnly fallback={content}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger class="flex items-center gap-1">
                  {@render content()}
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  {#each children as child}
                    {#snippet content()}
                      <DropdownMenu.Item class="cursor-pointer">
                        {child.label}
                      </DropdownMenu.Item>
                    {/snippet}

                    {#if child.href !== undefined}
                      <a href={child.href}>
                        {@render content()}
                      </a>
                    {:else}
                      {@render content()}
                    {/if}
                  {/each}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
