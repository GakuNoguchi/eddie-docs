import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      console.log('🔧 Eddie theme loaded!')

      // Force light mode (override VitePress dark mode detection)
      document.documentElement.classList.remove('dark')
      localStorage.setItem('vitepress-theme-appearance', 'light')

      // Insert download button next to search button
      const insertDownloadButton = () => {
        if (document.querySelector('.download-button')) return

        // Find the VPNavBarSearch container (the wrapper around search button)
        const searchContainer = document.querySelector('.VPNavBarSearch')

        if (!searchContainer) {
          console.log('Search container not found yet')
          return
        }

        const btn = document.createElement('button')
        btn.className = 'download-button VPNavBarIconLink'
        btn.setAttribute('aria-label', 'Download')
        btn.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px; flex-shrink: 0;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span class="download-text">Download</span>
        `

        btn.onclick = async () => {
          console.log('📥 Download button clicked')
          console.log('Current URL:', window.location.href)
          console.log('Pathname:', window.location.pathname)

          // Show download menu
          const menu = document.createElement('div')
          menu.className = 'download-menu'
          menu.innerHTML = `
            <button class="download-menu-item" data-action="current-md">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>Markdown</span>
            </button>
            <button class="download-menu-item" data-action="current-pdf">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h6M9 14h6"/>
              </svg>
              <span>PDF</span>
            </button>
            <button class="download-menu-item" data-action="current-docx">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6"/>
              </svg>
              <span>Word</span>
            </button>
            <button class="download-menu-item" data-action="all">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 18px; height: 18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>All Pages (Markdown ZIP)</span>
            </button>
          `

          // Position menu below button (right-aligned to prevent cutoff)
          const rect = btn.getBoundingClientRect()
          menu.style.top = `${rect.bottom + 8}px`
          menu.style.right = `${window.innerWidth - rect.right}px`
          document.body.appendChild(menu)

          // Close menu on outside click
          const closeMenu = (e) => {
            if (!menu.contains(e.target) && e.target !== btn) {
              menu.remove()
              document.removeEventListener('click', closeMenu)
            }
          }
          setTimeout(() => document.addEventListener('click', closeMenu), 0)

          // Handle menu item clicks
          menu.querySelectorAll('.download-menu-item').forEach(item => {
            item.onclick = async () => {
              menu.remove()
              const action = item.dataset.action
              console.log('🔽 Menu item clicked:', action)

              if (action === 'current-md') {
                console.log('🔽 Starting Markdown download')
                await downloadCurrentPage('md')
              } else if (action === 'current-pdf') {
                console.log('🔽 Starting PDF download')
                await downloadCurrentPage('pdf')
              } else if (action === 'current-docx') {
                console.log('🔽 Starting Word download')
                await downloadCurrentPage('docx')
              } else if (action === 'all') {
                console.log('🔽 Starting ZIP download (all pages)')
                await downloadAllPages()
              }
            }
          })
        }

        // Download current page
        async function downloadCurrentPage(format = 'md') {
          console.log(`📄 downloadCurrentPage called with format: ${format}`)

          try {
            const path = window.location.pathname
            console.log('Current path:', path)

            // Convert .html to .md for fetching the source
            let mdPath = path.replace(/\.html$/, '.md')
            if (mdPath.endsWith('/')) {
              mdPath = mdPath + 'index.md'
            }
            console.log('Converted mdPath:', mdPath)
            console.log('About to fetch:', mdPath)

            const response = await fetch(mdPath)
            console.log('Fetch response status:', response.status)
            console.log('Fetch response ok:', response.ok)
            console.log('Fetch response URL:', response.url)

            if (!response.ok) {
              console.error('❌ Fetch failed:', response.status, response.statusText)
              throw new Error('File not found')
            }

            const markdown = await response.text()
            console.log('✅ Markdown fetched successfully')
            console.log('Markdown length:', markdown.length)
            console.log('First 100 chars:', markdown.substring(0, 100))

            const baseName = mdPath.split('/').pop().replace('.md', '')
            console.log('Base filename:', baseName)

            if (format === 'md') {
              console.log('💾 Creating Markdown blob')
              const blob = new Blob([markdown], { type: 'text/markdown' })
              downloadFile(blob, `${baseName}.md`)
              console.log('✅ Markdown download triggered')
            } else if (format === 'pdf') {
              console.log('📑 Starting PDF generation')
              await downloadAsPDF(markdown, baseName)
            } else if (format === 'docx') {
              console.log('📘 Starting Word generation')
              await downloadAsWord(markdown, baseName)
            }
          } catch (error) {
            console.error('❌ Download failed:', error)
            console.error('Error name:', error.name)
            console.error('Error message:', error.message)
            console.error('Error stack:', error.stack)
            alert('ダウンロードに失敗しました')
          }
        }

        // Helper: Download file
        function downloadFile(blob, filename) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          a.click()
          URL.revokeObjectURL(url)
        }

        // Convert Markdown to PDF
        async function downloadAsPDF(markdown, filename) {
          console.log('📑 downloadAsPDF called')
          console.log('Markdown length:', markdown.length)
          console.log('Filename:', filename)

          try {
            // Use html2pdf for better Unicode/emoji support
            if (!window.html2pdf) {
              console.log('⬇️ Loading html2pdf library...')
              await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')
              console.log('✅ html2pdf loaded')
            } else {
              console.log('✅ html2pdf already loaded')
            }

            // Convert markdown to HTML (simple conversion)
            console.log('🔄 Converting markdown to HTML')
            const htmlContent = markdown
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/\n\n/g, '<br><br>')
              .replace(/\n/g, '<br>')

            console.log('HTML content length:', htmlContent.length)

            const element = document.createElement('div')
            element.innerHTML = htmlContent
            element.style.padding = '20px'
            element.style.fontFamily = 'Arial, sans-serif'
            element.style.fontSize = '12px'
            element.style.lineHeight = '1.6'

            console.log('🖨️ Generating PDF...')
            await window.html2pdf().from(element).save(`${filename}.pdf`)
            console.log('✅ PDF saved:', `${filename}.pdf`)
          } catch (error) {
            console.error('❌ PDF generation failed:', error)
            console.error('Error stack:', error.stack)
            alert('PDF generation failed. Please try downloading as Markdown instead.')
          }
        }

        // Convert Markdown to Word
        async function downloadAsWord(markdown, filename) {
          console.log('📘 downloadAsWord called')
          console.log('Markdown length:', markdown.length)
          console.log('Filename:', filename)

          try {
            // Load docx from CDN (browser bundle)
            if (!window.docx) {
              console.log('⬇️ Loading docx library...')
              await loadScript('https://unpkg.com/docx@8.5.0/build/index.js')
              console.log('✅ docx loaded')
            } else {
              console.log('✅ docx already loaded')
            }

            console.log('📦 Extracting docx classes')
            const { Document, Packer, Paragraph, TextRun } = window.docx
            console.log('Document type:', typeof Document)
            console.log('Packer type:', typeof Packer)
            console.log('Paragraph type:', typeof Paragraph)
            console.log('TextRun type:', typeof TextRun)

            // Simple paragraph conversion
            console.log('🔄 Converting markdown to paragraphs')
            const paragraphs = markdown.split('\n\n').map(text =>
              new Paragraph({
                children: [new TextRun(text)]
              })
            )
            console.log('Paragraph count:', paragraphs.length)

            console.log('📝 Creating document')
            const doc = new Document({
              sections: [{ children: paragraphs }]
            })

            console.log('💾 Packing to blob')
            const blob = await Packer.toBlob(doc)
            console.log('Blob size:', blob.size)

            downloadFile(blob, `${filename}.docx`)
            console.log('✅ Word saved:', `${filename}.docx`)
          } catch (error) {
            console.error('❌ Word generation failed:', error)
            console.error('Error stack:', error.stack)
            alert('Word generation failed. Please try downloading as Markdown instead.')
          }
        }

        // Load external script
        function loadScript(src) {
          console.log('📥 loadScript:', src)
          return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
              console.log('✅ Script loaded successfully:', src)
              resolve()
            }
            script.onerror = (error) => {
              console.error('❌ Script load failed:', src, error)
              reject(error)
            }
            document.head.appendChild(script)
          })
        }

        // Download all pages as ZIP
        async function downloadAllPages() {
          console.log('📦 downloadAllPages called')

          try {
            // Load JSZip from CDN
            if (!window.JSZip) {
              console.log('⬇️ Loading JSZip library...')
              await loadScript('https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js')
              console.log('✅ JSZip loaded')
            } else {
              console.log('✅ JSZip already loaded')
            }

            const zip = new window.JSZip()
            console.log('📦 ZIP instance created')

            // Get all markdown links from sidebar
            const links = Array.from(document.querySelectorAll('.VPSidebar a'))
              .map(a => a.getAttribute('href'))
              .filter(href => href && !href.startsWith('http'))
              .map(href => {
                // Convert .html to .md (replace, not append)
                if (href.endsWith('.html')) {
                  return href.replace(/\.html$/, '.md')
                } else if (href.endsWith('/')) {
                  return href + 'index.md'
                } else {
                  return href + '.md'
                }
              })

            console.log('Found sidebar links:', links.length)
            console.log('Links:', links)

            // Add current page if not in list
            const currentPath = window.location.pathname
            const currentMd = currentPath.endsWith('/') ? currentPath + 'index.md' : currentPath + '.md'
            if (!links.includes(currentMd)) {
              links.push(currentMd)
              console.log('Added current page:', currentMd)
            }

            console.log('Total links to fetch:', links.length)

            // Fetch all markdown files
            let successCount = 0
            for (const mdPath of links) {
              try {
                console.log(`Fetching: ${mdPath}`)
                const response = await fetch(mdPath)
                console.log(`Response for ${mdPath}: ${response.status}`)
                if (response.ok) {
                  const content = await response.text()
                  const fileName = mdPath.replace(/^\//, '').replace(/\//g, '_')
                  zip.file(fileName, content)
                  successCount++
                  console.log(`✅ Added to ZIP: ${fileName}`)
                } else {
                  console.warn(`❌ Failed to fetch ${mdPath}: ${response.status}`)
                }
              } catch (e) {
                console.warn(`❌ Exception fetching ${mdPath}:`, e)
              }
            }

            console.log(`Total files successfully fetched: ${successCount}/${links.length}`)

            if (successCount === 0) {
              console.error('❌ No files could be downloaded')
              alert('ダウンロード可能なファイルが見つかりませんでした')
              return
            }

            // Generate ZIP
            console.log('📦 Generating ZIP file...')
            const zipBlob = await zip.generateAsync({ type: 'blob' })
            console.log('ZIP blob size:', zipBlob.size)

            const url = URL.createObjectURL(zipBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'eddie-docs-all.zip'
            a.click()
            URL.revokeObjectURL(url)

            console.log(`✅ Downloaded ${successCount} files as ZIP`)
          } catch (error) {
            console.error('❌ ZIP download failed:', error)
            console.error('Error stack:', error.stack)
            alert('ZIPダウンロードに失敗しました')
          }
        }

        // Insert directly inside the navbar actions container
        const navbarActions = document.querySelector('.VPNavBar .content-body .content')
        if (navbarActions) {
          navbarActions.appendChild(btn)
          console.log('✅ Download button inserted into navbar actions')
        } else {
          // Fallback: insert after search container
          searchContainer.parentElement.insertBefore(btn, searchContainer.nextSibling)
          console.log('✅ Download button inserted after search container (fallback)')
        }
      }

      // Initial insert
      insertDownloadButton()

      // Watch for navigation changes (SPA)
      const observer = new MutationObserver(insertDownloadButton)
      observer.observe(document.body, { childList: true, subtree: true })
    })
  }
}
