#!/usr/bin/env python3
# Pretty-format the HTML files in the Maelan Tomasek website so they are easier to edit.
# Run this script from the root website folder, for example:
# C:/Users/JordanLab/Documents/Website_MaelanTomasek
#
# What it does:
# - Formats the English and French HTML files with indentation and line breaks.
# - Keeps the same filenames and folder structure.
# - Creates a timestamped backup folder before changing anything.
# - Does not intentionally change text, links, classes, ids, images, or page structure.

from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime
import shutil

HTML_FILES = [
    Path('index.html'),
    Path('research.html'),
    Path('science-communication.html'),
    Path('books.html'),
    Path('contact.html'),
    Path('fr/index.html'),
    Path('fr/recherche.html'),
    Path('fr/communication-scientifique.html'),
    Path('fr/livres.html'),
    Path('fr/contact.html'),
]


def pretty_html(raw_html: str) -> str:
    """Return readable HTML with indentation."""
    soup = BeautifulSoup(raw_html, 'html.parser')
    pretty = soup.prettify(formatter='html5')

    # Ensure a clean HTML5 doctype at the top.
    lower = pretty.lstrip().lower()
    if not lower.startswith('<!doctype html>'):
        pretty = '<!DOCTYPE html>\n' + pretty
    else:
        pretty = '<!DOCTYPE html>\n' + pretty.lstrip().split('\n', 1)[1]

    return pretty.rstrip() + '\n'


def main() -> None:
    root = Path.cwd()
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = root / f'html_backup_before_pretty_format_{timestamp}'
    backup_dir.mkdir(exist_ok=True)

    changed = []
    skipped = []

    for html_file in HTML_FILES:
        if not html_file.exists():
            skipped.append(str(html_file))
            continue

        backup_path = backup_dir / html_file
        backup_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(html_file, backup_path)

        raw = html_file.read_text(encoding='utf-8')
        formatted = pretty_html(raw)
        html_file.write_text(formatted, encoding='utf-8', newline='\n')
        changed.append(str(html_file))

    print('Formatted HTML files:')
    for file_name in changed:
        print('  -', file_name)

    if skipped:
        print('\nSkipped missing files:')
        for file_name in skipped:
            print('  -', file_name)

    print('\nBackup created at:')
    print(' ', backup_dir)
    print('\nDone. Open any HTML file now — the code should be much easier to navigate.')


if __name__ == '__main__':
    main()
