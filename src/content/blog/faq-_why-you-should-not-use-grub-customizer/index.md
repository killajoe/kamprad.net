---
title: "#FAQ _Why you should NOT use grub-customizer?"
date: 2023-02-28
categories: 
  - "allgemein"
---

![](images/64x64.png)

1. First of all the name is misleading it is not a customizer for the grub setup, it is instead a customized grub!

3. You do not change grub settings every day, and in 99,999% of cases you change something and never touch it again till something go south with it. And when this happens you have long time forgot about installing grub-customizer and used it to change … boot menu size or something.. And if you start using Grub-Customizer you can not really use grub itself anymore in the same way… So most tutorials will fail… See here endless issues with using it:  
    https://forum.endeavouros.com/search?q=grub-customizer

5. most settings can be handled by simply changing a well documented configuration, so with no real need for extreme custom grub bootloader setups… Try searching for default config options to add in `/etc/default/grub` Read the wiki: https://wiki.archlinux.org/title/GRUB or ask here at the forum or at the telegram chat, we will help you in any way possible!

## And here is how to remove it:

If you do already use grub-customizer and want to remove it follow this from `/etc/grub.d/backup/RESTORE_INSTRUCTIONS` to revert changes it has done to your system:

## How to restore this backup

- make sure you have root permissions (`gksu nautilus` or `sudo -s` on command line) otherwise you won't be able to copy the files

- to fix an unbootable configuration, just copy:
    - '/etc/grub.d/backup/boot\_grub' to '/boot/grub'

- to reset the whole configuration (if it cannot be fixed by using grub customizer), also copy these files:
    - '/etc/grub.d/backup/etc\_grub\_d' to '/etc/grub.d'
    
    - '/etc/grub.d/backup/default\_grub' to '/etc/default/grub'

So by that means to reset to what it was before using grub-customizer:

`sudo cp -a /etc/grub.d/backup/boot_grub /boot/grub`  
To get system back booting like before …

And:

```
sudo cp -a /etc/grub.d/backup/etc_grub_d /etc/grub.d
sudo cp /etc/grub.d/backup/default_grub /etc/default/grub
sudo pacman -R grub-customizer
```

to remove grub-customizer completely.

Source:

[https://forum.endeavouros.com/t/faq-why-you-should-not-use-grub-customizer/37844](https://forum.endeavouros.com/t/faq-why-you-should-not-use-grub-customizer/37844)

Grub-Customizer:

[https://launchpad.net/grub-customizer](https://launchpad.net/grub-customizer)

_If someone from [Grub Customizer](https://launchpad.net/grub-customizer) reads this.. please do not get offended its only about helping users to solve issues. But you should consider adding the removal info, and the existence of backup configurations for restoring the Grub bootloader, so that users can find this information._

_A problem can also be the package creation with Archlinux itself, it might be possible to restore grub when uninstalling._

* * *

**Deutsch:**

# #FAQ \_Warum solltest Du den Grub-Customizer NICHT verwenden?

![](images/64x64.png)

- Erstens ist der Name irreführend, es handelt sich nicht um ein Werkzeug um das Grub-Setup  anzupassen, sondern um einen angepasstes/verändertes Grub!
- Du veränderst die Grub-Einstellungen nicht jeden Tag, und in 99,999 % der Fälle änderst Du etwas und rührst es nie wieder an, bis etwas damit schief geht.  Und wenn das passiert, hast du schon lange Zeit vergessen, das du irgendwann mal den  Grub-Customizer installiert hast, und  ihn verwendet hast um … die Größe des Boot-Menüs oder so etwas zu ändern.  Und wenn du angefangen hast Grub-Customizer zu verwenden, kannst du Grub selbst nicht mehr wirklich auf die gleiche Weise verwenden wie zuvor … Also die meisten Tutorials werden fehlschlagen ... Schau dir hier endlose Probleme bei der Verwendung an: https://forum.endeavouros.com/search?q=grub-customizer
- Die meisten Einstellungen können durch einfaches Ändern einer gut dokumentierten Konfiguration vorgenommen werden, Grub-Bootloader-Setups sind keine Wissenschaft. Versuche einfach, nach Standardkonfigurationsoptionen zum Hinzufügen in /etc/default/grub zu suchen.
- Lese das Wiki: https://wiki.archlinux.org/title/GRUB oder frag im Forum oder im Telegram-Chat, wir werden dir gern auf die Sprünge helfen!

#### Und hier erfährst du wie du es wieder entfernst:

Wenn Du grub-customizer bereits verwendest und es entfernen möchtest, folge den  Anweisungen unter `/etc/grub.d/backup/RESTORE_INSTRUCTIONS`

um die am System vorgenommenen Änderungen rückgängig zu machen:

So stellst du dieses Backup wieder her:

Stelle sicher, dass Du über Root-Berechtigungen verfügst (gksu nautilus oder sudo -s in der Befehlszeile)

Andernfalls kannst du die Dateien nicht kopieren!

Kopiere : `/etc/grub.d/backup/boot_grub` nach `/boot/grub`

um die gesamte Konfiguration zurückzusetzen kopiere diese Dateien:

`/etc/grub.d/backup/etc_grub_d` nach `/etc/grub.d` und `/etc/grub.d/backup/default_grub` nach `/etc/default/grub`

Also um alles auf den Stand von vor der Verwendung von grub-customizer zurücksetzen sind diese Befehelszeilen nötig:

`sudo cp -a /etc/grub.d/backup/boot_grub /boot/grub`

Damit das System wieder wie zuvor bootet …

Und:

`sudo cp -a /etc/grub.d/backup/etc_grub_d /etc/grub.d` gefolgt von `sudo cp /etc/grub.d/backup/default_grub /etc/default/grub`

kopiert die Dateien aus dem Backup zurück ins System.

`sudo pacman -R grub-customizer` um das grub-customizer Paket zu entfernen.

Quelle: [https://forum.endeavouros.com/t/faq-why-you-should-not-use-grub-customizer/37844](https://forum.endeavouros.com/t/faq-why-you-should-not-use-grub-customizer/37844)
