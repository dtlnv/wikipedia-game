import { useState, useEffect, useRef, type FC } from 'react';

interface SearchResult {
    title: string;
    snippet: string;
    pageid: number;
}

interface SelectedArticle {
    title: string;
    pageid: number;
}

interface SearchProps {
    selectArticleAction: (article: string) => Promise<void>;
}

/**
 * Search within wiki content using api.php?action=query&list=search
 */
export const Search: FC<SearchProps> = ({ selectArticleAction }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSearchBlock, setShowSearchBlock] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<SelectedArticle | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (query.trim().length >= 2) {
            debounceTimer.current = setTimeout(() => {
                performSearch(query);
            }, 300);
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = async (searchQuery: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=20&format=json&origin=*`
            );
            const data = await response.json();
            setSearchResults(data.query.search || []);
            setShowDropdown(true);
        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectArticle = (result: SearchResult) => {
        setSelectedArticle({
            title: result.title,
            pageid: result.pageid,
        });
        setQuery(result.title);
        setShowDropdown(false);
    };

    const handleMakeTarget = () => {
        if (selectedArticle) {
            selectArticleAction && selectArticleAction(selectedArticle.title);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setSelectedArticle(null);
    };

    return (
        <div className='search-container'>
            <div className='buttons-block'>
                <button
                    type='button'
                    onClick={() => setShowSearchBlock(!showSearchBlock)}
                    title={showSearchBlock ? 'Hide search' : 'Show search'}
                    data-testid='show-search-button'
                >
                    {showSearchBlock ? '× Hide search' : 'Find target page'}
                </button>
            </div>

            {showSearchBlock && (
                <div className='search-block'>
                    <div className='search-input-wrapper' ref={dropdownRef}>
                        <input
                            type='text'
                            value={query}
                            onChange={handleInputChange}
                            onFocus={() => query.length >= 2 && searchResults.length > 0 && setShowDropdown(true)}
                            placeholder='Start typing to search...'
                            className='search-input'
                            autoFocus
                            data-testid='search-input'
                        />
                        {loading && <div className='search-loader'></div>}

                        {showDropdown && searchResults.length > 0 && (
                            <div className='search-dropdown'>
                                <ul className='search-results-list'>
                                    {searchResults.map((result) => (
                                        <li
                                            key={result.pageid}
                                            onClick={() => handleSelectArticle(result)}
                                            className={
                                                selectedArticle?.pageid === result.pageid
                                                    ? 'search-result-item selected'
                                                    : 'search-result-item'
                                            }
                                        >
                                            <div className='search-result-title'>{result.title}</div>
                                            <div
                                                className='search-result-snippet'
                                                dangerouslySetInnerHTML={{ __html: result.snippet }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {selectedArticle && (
                        <div className='selected-article'>
                            <div className='selected-article-label'>Selected:</div>
                            <div className='selected-article-title'>{selectedArticle.title}</div>
                            <button type='button' onClick={handleMakeTarget} className='make-target-button'>
                                Make this page a target
                            </button>
                        </div>
                    )}

                    {!loading && query.length >= 2 && searchResults.length === 0 && (
                        <div className='no-results'>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};
