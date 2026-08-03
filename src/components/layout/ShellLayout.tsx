'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { VoiceController } from './VoiceController';
import { AdminCmsDrawer } from '@/features/admin/AdminCmsDrawer';
import { AiCopilotDrawer } from '@/features/ai-copilot/AiCopilotDrawer';
import { useCMS } from '@/context/CmsContext';

export const ShellLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [cmsOpen, setCmsOpen] = useState(false);
  const { editMode } = useCMS();

  return (
    <>
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenVoice={() => setVoiceOpen(true)}
        onOpenAdminCms={() => setCmsOpen(true)}
      />

      <main>{children}</main>

      <Footer />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <VoiceController
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
      />

      {editMode && (
        <AdminCmsDrawer
          isOpen={cmsOpen}
          onClose={() => setCmsOpen(false)}
        />
      )}

      <AiCopilotDrawer />
    </>
  );
};
