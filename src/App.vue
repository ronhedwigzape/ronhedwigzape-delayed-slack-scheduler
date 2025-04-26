<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

// Reactive form state
const delayValue   = ref<number|null>(null)
const delayUnit    = ref<'seconds'|'minutes'|'hours'>('seconds')
const messageText  = ref<string>('')
const webhookUrl   = ref<string>('')

// Dialog state for feedback
const showDialog    = ref(false)
const dialogMessage = ref('')

// Enable send when all fields are non-empty
const canSend = computed(() =>
    !!delayValue.value &&
    messageText.value.trim() !== '' &&
    webhookUrl.value.trim() !== ''
)

// Dynamic button label
const buttonLabel = computed(() =>
    delayValue.value
        ? `Send in ${delayValue.value} ${delayUnit.value}`
        : 'Send'
)

// Convert delay + unit → milliseconds
function computeDelayMs(): number {
  const factors = { seconds: 1_000, minutes: 60_000, hours: 3_600_000 }
  return (delayValue.value ?? 0) * factors[delayUnit.value]
}

// Send to Slack using form-urlencoded to avoid CORS preflight
async function sendToSlack(): Promise<void> {
  const payload = { text: `From Your Name's Slack Bot: ${messageText.value}` }
  const form = new URLSearchParams({ payload: JSON.stringify(payload) })
  await fetch(webhookUrl.value, {
    method: 'POST',
    body: form
  })
}

// Schedule the send after delay
function scheduleSend(): void {
  setTimeout(async () => {
    try {
      await sendToSlack()
      dialogMessage.value = 'Message sent successfully!'
    } catch {
      dialogMessage.value = 'Failed to send message.'
    } finally {
      showDialog.value = true
    }
  }, computeDelayMs())
}
</script>

<template>
  <main class="p-6 max-w-md mx-auto space-y-6">
    <h1 class="text-2xl font-semibold">Delayed Slack Sender</h1>

    <!-- Delay and Unit -->
    <div class="flex space-x-4">
      <Input v-model="delayValue" label="Delay" type="number" placeholder="Amount" />
      <Select v-model="delayUnit">
        <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Unit</SelectLabel>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- Message & Webhook URL -->
    <Input v-model="messageText" label="Message" placeholder="Your Slack message" />
    <Input v-model="webhookUrl" label="Webhook URL" placeholder="https://hooks.slack.com/…" />

    <!-- Send Button -->
    <Button :disabled="!canSend" @click="scheduleSend">
      {{ buttonLabel }}
    </Button>

    <!-- Feedback Dialog -->
    <AlertDialog v-model:open="showDialog">
      <AlertDialogTrigger asChild><span /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result</AlertDialogTitle>
          <AlertDialogDescription>
            {{ dialogMessage }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="showDialog = false">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </main>
</template>

<style scoped>
@import '@/index.css';
</style>
