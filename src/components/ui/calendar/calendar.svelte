<script lang="ts">
  import * as Calendar from "./index.js";

  import { cn } from "$lib/utils.js";

  import type { DateValue } from "@internationalized/date";
  import {
    Calendar as CalendarPrimitive,
    type CalendarDaySnippetProps,
    type WithoutChildrenOrChild,
  } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props {
    day: Snippet<[Record<string, unknown>, CalendarDaySnippetProps, DateValue]>;
  }

  let {
    day,
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & Props = $props();
</script>

<CalendarPrimitive.Root class={cn("p-3", className)} {...restProps}>
  {#snippet children({ months, weekdays })}
    <Calendar.Header>
      <Calendar.PrevButton />
      <Calendar.Heading />
      <Calendar.NextButton />
    </Calendar.Header>
    <Calendar.Months>
      {#each months as month}
        <Calendar.Grid>
          <Calendar.GridHead>
            <Calendar.GridRow class="flex">
              {#each weekdays as weekday}
                <Calendar.HeadCell>
                  {weekday.slice(0, 2)}
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as weekDates}
              <Calendar.GridRow class="mt-2 w-full">
                {#each weekDates as date}
                  <Calendar.Cell {date} month={month.value}>
                    <Calendar.Day>
                      {#snippet child({ props, ...data })}
                        {@render day(props, data, date)}
                      {/snippet}
                    </Calendar.Day>
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </Calendar.Months>
  {/snippet}
</CalendarPrimitive.Root>
